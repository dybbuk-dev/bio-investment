export default class PermissionChecker {
  currentUser;

  constructor(currentUser) {
    this.currentUser = currentUser;
  }

  get currentUserRoleId() {
    if (
      !this.currentUser ||
      this.currentUser.status !== 'active'
    ) {
      return [];
    }

    return this.currentUser.role;
  }

  get isAdmin() {
    if (
      !this.currentUser ||
      this.currentUser.status !== 'active'
    ) {
      return false;
    }

    return Boolean(
      this.currentUser.role === 'admin' ||
        this.currentUser.role === 'manager',
    );
  }

  match(permission) {
    if (!permission) {
      return true;
    }

    return this.rolesMatchOneOf(permission.allowedRoles);
  }

  rolesMatchOneOf(arg) {
    if (!this.currentUserRoleId) {
      return false;
    }

    if (!arg) {
      return false;
    }

    if (Array.isArray(arg)) {
      if (!arg.length) {
        return false;
      }

      return arg.some(
        (role) => this.currentUserRoleId === role,
      );
    }

    return this.currentUserRoleId === arg;
  }

  get isEmpty() {
    if (!this.isAuthenticated) {
      return true;
    }

    return this.currentUser.status !== 'active';
  }

  get isEmptyPermissions() {
    if (!this.isAuthenticated) {
      return true;
    }

    if (this.currentUser.status !== 'active') {
      return true;
    }

    return (
      !this.currentUser.role || this.currentUser.role === ''
    );
  }

  get isAuthenticated() {
    return (
      Boolean(this.currentUser) &&
      Boolean(this.currentUser.id)
    );
  }

  get isEmailVerified() {
    if (!this.isAuthenticated) {
      return false;
    }

    return this.currentUser.emailVerified;
  }
}
