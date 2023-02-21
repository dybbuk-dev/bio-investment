import { AuthToken } from 'src/modules/auth/authToken';
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthInvitationToken from 'src/modules/auth/authInvitationToken';

export default class AuthService {
  static async sendEmailVerification() {
    const response = await authAxios.post(
      '/auth/send-email-address-verification-email',
    );

    return response.data;
  }

  static async sendPasswordResetEmail(email) {
    const response = await authAxios.post(
      '/auth/send-password-reset-email',
      {
        email,
      },
    );

    return response.data;
  }

  static async sendEmailToSupport(data) {
    console.log('-------------authService--------------');
    const response = await authAxios.post(
      '/auth/send-email-to-support',
      {
        data,
      },
    );

    return response.data;
  }

  static async sendEmailOnComingSoon(email) {
    const response = await authAxios.post(
      '/auth/send-email-on-comingSoon',
      {
        email,
      },
    );

    return response.data;
  }

  static async registerWithEmailAndPassword(
    email,
    password,
    role,
    status,
  ) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post('/auth/sign-up', {
      email,
      password,
      role,
      status,
      invitationToken,
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async registerWithData(data) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post('/auth/sign-up', {
      ...data,
      invitationToken,
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async signinWithEmailAndPassword(email, password) {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post('/auth/sign-in', {
      email,
      password,
      invitationToken,
    });

    AuthInvitationToken.clear();

    return response.data;
  }

  static async fetchMe() {
    const response = await authAxios.get('/auth/me');
    return response.data;
  }

  static signout() {
    AuthToken.set(null, true);
  }

  static async updateProfile(data) {
    const body = {
      data,
    };

    const response = await authAxios.put(
      '/auth/profile',
      body,
    );

    return response.data;
  }

  static async changePassword(oldPassword, newPassword) {
    const body = {
      oldPassword,
      newPassword,
    };

    const response = await authAxios.put(
      '/auth/change-password',
      body,
    );

    return response.data;
  }

  static async passwordReset(token, password) {
    const response = await authAxios.put(
      '/auth/password-reset',
      {
        token,
        password,
      },
    );

    return response.data;
  }

  static async verifyEmail(token) {
    const response = await authAxios.put(
      '/auth/verify-email',
      {
        token,
      },
    );

    return response.data;
  }

  static async socialOnboard() {
    const invitationToken = AuthInvitationToken.get();

    const response = await authAxios.post(
      '/auth/social/onboard',
      {
        invitationToken,
      },
    );

    AuthInvitationToken.clear();

    return response.data;
  }

  static async socialOnGoogle() {
    const response = await authAxios.get(
      '/auth/social/google',
    );

    return response.data;
  }

  static isSocialOnboardRequested() {
    const urlParams = new URLSearchParams(
      window.location.search,
    );

    return Boolean(urlParams.get('social'));
  }

  static async acceptInvitation(
    token,
    forceAcceptOtherEmail = false,
  ) {
    const response = await authAxios.post(
      `/auth/invitation/${token}/accept`,
      {
        forceAcceptOtherEmail,
      },
    );

    return response.data;
  }

  static async declineInvitation(token) {
    const params = null;

    const response = await authAxios.delete(
      `/auth/invitation/${token}/decline`,
      {
        params,
      },
    );

    return response.data;
  }
}
