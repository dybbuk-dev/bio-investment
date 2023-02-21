import { createSelector } from 'reselect';
import _get from 'lodash/get';

const selectRaw = (state) => state.auth;

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser,
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.email : null),
);

const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.fullName : '',
);

const selectSignedIn = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    Boolean(currentUser) && Boolean(currentUser.id),
);

const selectRole = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (!currentUser) {
      return null;
    }

    return currentUser.role;
  },
);

const selectStatus = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (!currentUser) {
      return null;
    }

    return currentUser.status;
  },
);

const selectLoading = createSelector([selectRaw], (auth) =>
  Boolean(auth.loading),
);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingInit),
);

const selectLoadingEmailConfirmation = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingEmailConfirmation),
);

const selectLoadingPasswordResetEmail = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingPasswordResetEmail),
);

const selectLoadingInvitation = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.loadingInvitation),
);

const selectWarningMessage = createSelector(
  [selectRaw],
  (raw) => raw.warningMessage,
);

const selectLoadingPasswordReset = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingPasswordReset),
);

const selectLoadingVerifyEmail = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingVerifyEmail),
);

const selectLoadingPasswordChange = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingPasswordChange),
);

const selectLoadingUpdateProfile = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingUpdateProfile),
);

const selectErrorMessage = createSelector(
  [selectRaw],
  (auth) => auth.errorMessage,
);

const selectErrorMessageVerifyEmail = createSelector(
  [selectRaw],
  (auth) => auth.errorMessageVerifyEmail,
);
const selectCurrentUserNameOrEmailPrefix = createSelector(
  [selectCurrentUser, selectCurrentUserFullName],
  (currentUser, fullName) => {
    if (!currentUser) {
      return '';
    }

    if (fullName && fullName.length < 25) {
      return fullName;
    }

    if (currentUser.firstName) {
      return currentUser.firstName;
    }

    return currentUser.email.split('@')[0];
  },
);

const selectCurrentUserAvatar = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (
      !currentUser ||
      !currentUser.avatars ||
      !currentUser.avatars.length ||
      !currentUser.avatars[0].downloadUrl
    ) {
      return null;
    }

    return currentUser.avatars[0].downloadUrl;
  },
);

const authSelectors = {
  selectAuthenticationUser,
  selectCurrentUser,
  selectCurrentUserAvatar,
  selectCurrentUserEmail,
  selectCurrentUserFullName,
  selectCurrentUserNameOrEmailPrefix,
  selectErrorMessage,
  selectErrorMessageVerifyEmail,
  selectLoading,
  selectLoadingEmailConfirmation,
  selectLoadingInit,
  selectLoadingPasswordChange,
  selectLoadingPasswordReset,
  selectLoadingPasswordResetEmail,
  selectLoadingUpdateProfile,
  selectLoadingVerifyEmail,
  selectLoadingInvitation,
  selectWarningMessage,
  selectRaw,
  selectRole,
  selectStatus,
  selectSignedIn,
};

export default authSelectors;
