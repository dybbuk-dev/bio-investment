import Roles from './roles';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      adminEdit: {
        id: 'adminEdit',
        allowedRoles: [roles.admin],
      },
      adminDestroy: {
        id: 'adminDestroy',
        allowedRoles: [roles.admin],
      },
      adminCreate: {
        id: 'adminCreate',
        allowedRoles: [roles.admin],
      },
      adminImport: {
        id: 'adminImport',
        allowedRoles: [roles.admin],
      },
      adminRead: {
        id: 'adminRead',
        allowedRoles: [roles.admin],
      },
      adminAutocomplete: {
        id: 'adminAutocomplete',
        allowedRoles: [roles.admin],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
      },
      muiEdit: {
        id: 'muiEdit',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.customer,
        ],
      },
      customerEdit: {
        id: 'customerEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedStorage: [storage.identityImages],
      },
      customerDestroy: {
        id: 'customerDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedStorage: [storage.identityImages],
      },
      customerCreate: {
        id: 'customerCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedStorage: [storage.identityImages],
      },
      customerRead: {
        id: 'customerRead',
        allowedRoles: [roles.admin, roles.manager],
      },
      customerAutocomplete: {
        id: 'customerAutocomplete',
        allowedRoles: [roles.admin, roles.manager],
      },

      tokenImport: {
        id: 'tokenImport',
        allowedRoles: [roles.admin, roles.manager],
      },
      tokenCreate: {
        id: 'tokenCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedStorage: [storage.tokenImage],
      },
      tokenEdit: {
        id: 'tokenEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedStorage: [storage.tokenImage],
      },
      tokenDestroy: {
        id: 'tokenDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedStorage: [storage.tokenImage],
      },
      tokenRead: {
        id: 'tokenRead',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.customer,
        ],
      },
      tokenAutocomplete: {
        id: 'tokenAutocomplete',
        allowedRoles: [
          roles.admin,
          roles.manager,
          roles.customer,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
