import assert from 'assert';
import EmailSender from '../../services/emailSender';
import UserRepository from '../../database/repositories/userRepository';
import MongooseRepository from '../../database/repositories/mongooseRepository';
import { getConfig } from '../../config';
import { IServiceOptions } from '../IServiceOptions';
import Error400 from '../../errors/Error400';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const BCRYPT_SALT_ROUNDS = 12;

export default class UserCreator {
  options: IServiceOptions;
  session;
  data;
  emailsToInvite: Array<any> = [];
  emails: any = [];
  sendInvitationEmails = true;

  constructor(options) {
    this.options = options;
  }

  async invite(data, sendInvitationEmails = true) {
    this.data = data;
    this.sendInvitationEmails = sendInvitationEmails;

    await this._validate();

    try {
      this.session = await MongooseRepository.createSession(
        this.options.database,
      );

      await this._addOrUpdateAll();

      await MongooseRepository.commitTransaction(
        this.session,
      );
    } catch (error) {
      await MongooseRepository.abortTransaction(
        this.session,
      );
      throw error;
    }

    if (this._hasEmailsToInvite) {
      await this._sendAllInvitationEmails();
    }
  }

  get _role() {
    return this.data.role;
  }

  get _emails() {
    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      this.emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      this.emails = uniqueEmails;
    }

    return this.emails.map((email) => email.trim());
  }

  /**
   * Creates or updates many users at once.
   */
  async _addOrUpdateAll() {
    return Promise.all(
      this.emails.map((email) => this._addOrUpdate(email)),
    );
  }

  /**
   * Creates or updates the user passed.
   * If the user already exists, it only adds the role to the user.
   */
  async _addOrUpdate(email) {
    const isExisted = Boolean(
      await UserRepository.count(
        { email: email },
        { ...this.options, session: this.session },
      ),
    );

    if (isExisted) {
      throw new Error400(
        this.options.language,
        'auth.emailAlreadyInUse',
      );
    }

    const user = await UserRepository.create(
      {
        email,
        role: this._role,
        status: 'invited',
        invitationToken: crypto
          .randomBytes(20)
          .toString('hex'),
      },
      {
        ...this.options,
        session: this.session,
      },
    );

    this.emailsToInvite.push({
      email,
      token: user.invitationToken,
    });
  }

  get _hasEmailsToInvite() {
    return (
      this.emailsToInvite && this.emailsToInvite.length
    );
  }

  async _sendAllInvitationEmails() {
    if (!this.sendInvitationEmails) {
      return;
    }

    return Promise.all(
      this.emailsToInvite.map((emailToInvite) => {
        const link = `${
          getConfig().FRONTEND_URL
        }/invitation?token=${emailToInvite.token}`;

        return new EmailSender(
          EmailSender.TEMPLATES.INVITATION,
          {
            link,
          },
        ).sendTo(emailToInvite.email);
      }),
    );
  }

  async _validate() {
    assert(
      this.options.currentUser,
      'currentUser is required',
    );

    assert(
      this.options.currentUser.id,
      'currentUser.id is required',
    );

    assert(
      this.options.currentUser.email,
      'currentUser.email is required',
    );

    assert(
      this._emails && this._emails.length,
      'emails is required',
    );

    assert(this._role, 'role is required');
  }
}
