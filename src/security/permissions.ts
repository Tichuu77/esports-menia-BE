/// File is generated from https://studio.fabbuilder.com -

import Roles from './roles';
 
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
 

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.owner],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.owner],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.owner],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.owner],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.owner,roles.admin],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.owner,roles.admin],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.owner,roles.admin],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.owner,roles.admin],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.owner, roles.admin,],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.owner],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.owner],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner,],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
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
/// File is generated from https://studio.fabbuilder.com -
