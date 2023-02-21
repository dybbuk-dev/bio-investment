import actions from 'src/modules/auth/authActions';

const initialData = {
  currentUser: null,
  loadingInit: true,
  loadingEmailConfirmation: false,
  loadingPasswordResetEmail: false,
  loadingPasswordChange: false,
  loadingVerifyEmail: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loadingInvitation: false,
  loading: false,
  errorMessage: null,
  errorMessageVerifyEmail: null,
  warningMessage: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_ERROR) {
    return {
      ...state,
      currentUser: null,
    };
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      errorMessage: null,
      loading: false,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      currentUser: null,
      errorMessage: payload || null,
      loading: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_START) {
    return {
      ...state,
      loadingEmailConfirmation: true,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_SUCCESS) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_START) {
    return {
      ...state,
      loadingPasswordResetEmail: true,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_SUCCESS) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.PASSWORD_RESET_EMAIL_ERROR) {
    return {
      ...state,
      loadingPasswordResetEmail: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_START) {
    return {
      ...state,
      loadingPasswordChange: true,
    };
  }

  if (type === actions.PASSWORD_CHANGE_SUCCESS) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.PASSWORD_CHANGE_ERROR) {
    return {
      ...state,
      loadingPasswordChange: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
      loadingInit: false,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      currentUser: null,
      loadingInit: false,
    };
  }

  if (type === actions.EMAIL_VERIFY_START) {
    return {
      ...state,
      loadingVerifyEmail: true,
      errorMessageVerifyEmail: null,
    };
  }

  if (type === actions.EMAIL_VERIFY_SUCCESS) {
    return {
      ...state,
      loadingVerifyEmail: false,
      errorMessageVerifyEmail: null,
    };
  }

  if (type === actions.EMAIL_VERIFY_ERROR) {
    return {
      ...state,
      loadingVerifyEmail: false,
      errorMessageVerifyEmail: payload,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_STARTED) {
    return {
      ...state,
      warningMessage: null,
      loadingInvitation: true,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_SUCCESS) {
    return {
      ...state,
      loadingInvitation: false,
      warningMessage: null,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_WARNING) {
    return {
      ...state,
      loadingInvitation: false,
      warningMessage: payload,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_ERROR) {
    return {
      ...state,
      loadingInvitation: false,
      warningMessage: null,
    };
  }

  if (type === actions.ACCEPT_STARTED) {
    return {
      ...state,
      loadingInvitation: true,
    };
  }

  if (type === actions.ACCEPT_SUCCESS) {
    return {
      ...state,
      loadingInvitation: false,
    };
  }

  if (type === actions.ACCEPT_ERROR) {
    return {
      ...state,
      loadingInvitation: false,
    };
  }

  if (type === actions.DECLINE_STARTED) {
    return {
      ...state,
      loadingInvitation: true,
    };
  }

  if (type === actions.DECLINE_SUCCESS) {
    return {
      ...state,
      loadingInvitation: false,
    };
  }

  if (type === actions.DECLINE_ERROR) {
    return {
      ...state,
      loadingInvitation: false,
    };
  }

  return state;
};
