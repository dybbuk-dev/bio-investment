import UserRepository from '../../database/repositories/userRepository';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';
import EmailSender from '../../services/emailSender';
import jwt from 'jsonwebtoken';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import { getConfig } from '../../config';
import Error401 from '../../errors/Error401';
import Error404 from '../../errors/Error404';
import moment from 'moment';

const BCRYPT_SALT_ROUNDS = 12;

class AuthService {
  static async signup(data, options: any = {}) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      data.email = data.email.toLowerCase();

      const existingUser = await UserRepository.findByEmail(
        data.email,
        options,
      );

      const hashedPassword = await bcrypt.hash(
        data.password,
        BCRYPT_SALT_ROUNDS,
      );

      if (existingUser) {
        const existingPassword =
          await UserRepository.findPassword(
            existingUser.id,
            options,
          );

        if (existingPassword) {
          throw new Error400(
            options.language,
            'auth.emailAlreadyInUse',
          );
        }

        await UserRepository.updatePassword(
          existingUser.id,
          hashedPassword,
          false,
          {
            ...options,
            session,
            bypassPermissionValidation: true,
          },
        );

        await this.handleOnboard(
          existingUser,
          data.invitationToken,
          {
            ...options,
            session,
          },
        );

        const isEmailVerified = Boolean(
          await UserRepository.count(
            {
              emailVerified: true,
              _id: existingUser.id,
            },
            {
              ...options,
              session,
            },
          ),
        );

        if (!isEmailVerified && EmailSender.isConfigured) {
          await this.sendEmailAddressVerificationEmail(
            options.language,
            existingUser.email,
            {
              ...options,
              session,
              bypassPermissionValidation: true,
            },
          );
        }

        const token = jwt.sign(
          { id: existingUser.id },
          getConfig().AUTH_JWT_SECRET,
          { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
        );

        await MongooseRepository.commitTransaction(session);

        return token;
      }

      const newUser = await UserRepository.createFromAuth(
        {
          ...data,
          firstName: data.firstName
            ? data.firstName
            : data.email.split('@')[0],
          password: hashedPassword,
        },
        {
          ...options,
          session,
        },
      );

      await this.handleOnboard(
        newUser,
        data.invitationToken,
        {
          ...options,
          session,
        },
      );

      const isEmailVerified = Boolean(
        await UserRepository.count(
          {
            emailVerified: true,
            _id: newUser.id,
          },
          {
            ...options,
            session,
          },
        ),
      );

      if (!isEmailVerified && EmailSender.isConfigured) {
        await this.sendEmailAddressVerificationEmail(
          options.language,
          newUser.email,
          {
            ...options,
            session,
          },
        );
      }

      const token = jwt.sign(
        { id: newUser.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  static async findByEmail(email, options: any = {}) {
    email = email.toLowerCase();
    return UserRepository.findByEmail(email, options);
  }

  static async signin(
    email,
    password,
    invitationToken,
    options: any = {},
  ) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      email = email.toLowerCase();
      const user = await UserRepository.findByEmail(
        email,
        options,
      );

      if (!user) {
        throw new Error400(
          options.language,
          'auth.userNotFound',
        );
      }

      const currentPassword =
        await UserRepository.findPassword(user.id, options);

      if (!currentPassword) {
        throw new Error400(
          options.language,
          'auth.wrongPassword',
        );
      }

      const passwordsMatch = await bcrypt.compare(
        password,
        currentPassword,
      );

      if (!passwordsMatch) {
        throw new Error400(
          options.language,
          'auth.wrongPassword',
        );
      }

      await this.handleOnboard(user, invitationToken, {
        ...options,
        currentUser: user,
        session,
      });

      const token = jwt.sign(
        { id: user.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  static async handleOnboard(
    currentUser,
    invitationToken,
    options,
  ) {
    if (invitationToken) {
      try {
        await UserRepository.acceptInvitation(
          invitationToken,
          {
            ...options,
            currentUser,
            bypassPermissionValidation: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  static async findByToken(token, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getConfig().AUTH_JWT_SECRET,
        (err, decoded) => {
          if (err) {
            reject(err);
            return;
          }
          const id = decoded.id;
          const jwtTokenIat = decoded.iat;

          UserRepository.findById(id, {
            ...options,
            bypassPermissionValidation: true,
          })
            .then((user) => {
              const isTokenManuallyExpired =
                user &&
                user.jwtTokenInvalidBefore &&
                moment
                  .unix(jwtTokenIat)
                  .isBefore(
                    moment(user.jwtTokenInvalidBefore),
                  );

              if (isTokenManuallyExpired) {
                reject(new Error401());
                return;
              }

              // If the email sender id not configured,
              // removes the need for email verification.
              if (user && !EmailSender.isConfigured) {
                user.emailVerified = true;
              }

              resolve(user);
            })
            .catch((error) => reject(error));
        },
      );
    });
  }

  static async sendEmailAddressVerificationEmail(
    language,
    email,
    options,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, 'email.error');
    }

    let link;
    try {
      email = email.toLowerCase();
      const token =
        await UserRepository.generateEmailVerificationToken(
          email,
          options,
        );
      link = `${
        getConfig().FRONTEND_URL
      }/verify-email?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new Error400(
        language,
        'auth.emailAddressVerificationEmail.error',
      );
    }

    return new EmailSender(
      getConfig().SENDGRID_TEMPLATE_EMAIL_ADDRESS_VERIFICATION,
      { link },
    ).sendTo(email);
  }

  static async sendPasswordResetEmail(
    language,
    email,
    options,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, 'email.error');
    }

    let link;

    try {
      email = email.toLowerCase();
      const token =
        await UserRepository.generatePasswordResetToken(
          email,
          options,
        );

      link = `${
        getConfig().FRONTEND_URL
      }/password-reset?token=${token}`;
    } catch (error) {
      console.error(error);
      throw new Error400(
        language,
        'auth.passwordReset.error',
      );
    }

    return new EmailSender(
      EmailSender.TEMPLATES.PASSWORD_RESET,
      { link },
    ).sendTo(email);
  }

  static async sendEmailToSupport(language, data, options) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, 'email.error');
    }

    return new EmailSender(
      EmailSender.TEMPLATES.EMAIL_TO_SUPPORT,
      data,
    ).sendTo(EmailSender.SUPPORT_EMAIL);
  }

  static async sendEmailOnComingSoon(
    language,
    email,
    options,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error400(language, 'email.error');
    }

    return new EmailSender(
      EmailSender.TEMPLATES.EMAIL_ON_COMINGSOON,
      { email },
    ).sendTo(EmailSender.SUPPORT_EMAIL);
  }

  static async verifyEmail(token, options) {
    const currentUser = options.currentUser;

    const user =
      await UserRepository.findByEmailVerificationToken(
        token,
        options,
      );

    if (!user) {
      throw new Error400(
        options.language,
        'auth.emailAddressVerificationEmail.invalidToken',
      );
    }

    if (
      currentUser &&
      currentUser.id &&
      currentUser.id !== user.id
    ) {
      throw new Error400(
        options.language,
        'auth.emailAddressVerificationEmail.signedInAsWrongUser',
        user.email,
        currentUser.email,
      );
    }

    return UserRepository.markEmailVerified(
      user.id,
      options,
    );
  }

  static async passwordReset(
    token,
    password,
    options: any = {},
  ) {
    const user =
      await UserRepository.findByPasswordResetToken(
        token,
        options,
      );

    if (!user) {
      throw new Error400(
        options.language,
        'auth.passwordReset.invalidToken',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_SALT_ROUNDS,
    );

    return UserRepository.updatePassword(
      user.id,
      hashedPassword,
      true,
      { ...options, bypassPermissionValidation: true },
    );
  }

  static async changePassword(
    oldPassword,
    newPassword,
    options,
  ) {
    const currentUser = options.currentUser;
    const currentPassword =
      await UserRepository.findPassword(
        options.currentUser.id,
        options,
      );

    const passwordsMatch = await bcrypt.compare(
      oldPassword,
      currentPassword,
    );

    if (!passwordsMatch) {
      throw new Error400(
        options.language,
        'auth.passwordChange.invalidPassword',
      );
    }

    const newHashedPassword = await bcrypt.hash(
      newPassword,
      BCRYPT_SALT_ROUNDS,
    );

    return UserRepository.updatePassword(
      currentUser.id,
      newHashedPassword,
      true,
      options,
    );
  }

  static async signinFromSocial(
    provider,
    providerId,
    email,
    emailVerified,
    firstName,
    lastName,
    options: any = {},
  ) {
    if (!email) {
      throw new Error('auth-no-email');
    }

    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      email = email.toLowerCase();
      let user = await UserRepository.findByEmail(
        email,
        options,
      );

      if (
        user &&
        (user.provider !== provider ||
          user.providerId !== providerId)
      ) {
        throw new Error('auth-invalid-provider');
      }

      if (!user) {
        user = await UserRepository.createFromSocial(
          provider,
          providerId,
          email,
          emailVerified,
          firstName,
          lastName,
          options,
        );
      }

      const token = jwt.sign(
        { id: user.id },
        getConfig().AUTH_JWT_SECRET,
        { expiresIn: getConfig().AUTH_JWT_EXPIRES_IN },
      );

      await MongooseRepository.commitTransaction(session);

      return token;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  static async acceptInvitation(
    token,
    forceAcceptOtherEmail = false,
    options,
  ) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      const user =
        await UserRepository.findByInvitationToken(token, {
          ...options,
          session,
        });

      if (!user || user.status !== 'invited') {
        throw new Error404();
      }

      const isNotCurrentUserEmail =
        user.id !== options.currentUser.id;

      if (!forceAcceptOtherEmail && isNotCurrentUserEmail) {
        throw new Error400(
          options.language,
          'auth.invitation.notSameEmail',
          user.email,
          options.currentUser.email,
        );
      }

      await UserRepository.acceptInvitation(token, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return user;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }

  static async declineInvitation(token, options) {
    const session = await MongooseRepository.createSession(
      options.database,
    );

    try {
      const user =
        await UserRepository.findByInvitationToken(token, {
          ...options,
          session,
        });

      if (!user || user.status !== 'invited') {
        throw new Error404();
      }

      await UserRepository.destroy(user.id, {
        ...options,
        session,
      });

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      throw error;
    }
  }
}

export default AuthService;
