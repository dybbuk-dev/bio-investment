import Permissions from 'src/security/permissions';
import config from 'src/config';
const permissions = Permissions.values;

const adminRoutes = [
  {
    path: '/admin',
    i18n: 'dashboard.menu',
    loader: () =>
      import('src/view/admin/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/person-name-breadcrumb',
    collapseName: 'my-profile',
    i18n: 'roles.admin.label',
    parent: '/admin',
    redirect: '/admin/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/password-change',
    collapseName: 'my-profile',
    i18n: 'auth.passwordChange.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/admin',
    i18n: 'user.menu',
    collapseName: 'my-profile',
    parent: '/admin/person-name-breadcrumb',
    loader: () =>
      import('src/view/admin/admin/list/AdminPage'),
    permissionRequired: permissions.adminRead,
    exact: true,
  },

  {
    path: '/admin/admin/new',
    i18n: 'user.new.title',
    collapseName: 'my-profile',
    parent: '/admin/admin',
    loader: () =>
      import('src/view/admin/admin/new/AdminNewPage'),
    permissionRequired: permissions.adminCreate,
    exact: true,
  },

  {
    path: '/admin/admin/:id/edit',
    i18n: 'user.edit.title',
    collapseName: 'my-profile',
    parent: '/admin/admin',
    loader: () =>
      import('src/view/admin/admin/edit/AdminEditPage'),
    permissionRequired: permissions.adminEdit,
    exact: true,
  },

  {
    path: '/admin/admin/:id',
    i18n: 'user.view.title',
    collapseName: 'my-profile',
    parent: '/admin/admin',
    loader: () =>
      import('src/view/admin/admin/view/AdminViewPage'),
    permissionRequired: permissions.adminRead,
    exact: true,
  },

  {
    path: '/admin/audit-log',
    i18n: 'auditLog.menu',
    parent: '/admin',
    loader: () =>
      import('src/view/admin/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
    exact: true,
  },

  {
    path: '/admin/customer',
    i18n: 'customer.menu',
    parent: '/admin',
    loader: () =>
      import('src/view/admin/customer/list/CustomerPage'),
    permissionRequired: permissions.customerRead,
    exact: true,
  },

  {
    path: '/admin/customer/new',
    i18n: 'customer.new.title',
    parent: '/admin/customer',
    loader: () =>
      import(
        'src/view/admin/customer/form/CustomerFormPage'
      ),
    permissionRequired: permissions.customerCreate,
    exact: true,
  },

  {
    path: '/admin/customer/:id/edit',
    i18n: 'customer.edit.title',
    parent: '/admin/customer',
    loader: () =>
      import(
        'src/view/admin/customer/form/CustomerFormPage'
      ),
    permissionRequired: permissions.customerEdit,
    exact: true,
  },

  {
    path: '/admin/customer/:id/verify',
    i18n: 'customer.verify.title',
    parent: '/admin/customer',
    loader: () =>
      import(
        'src/view/admin/customer/view/CustomerViewPage'
      ),
    permissionRequired: permissions.customerEdit,
  },

  {
    path: '/admin/property',
    i18n: 'property.menu',
    parent: '/admin',
    loader: () =>
      import(
        'src/view/admin/property/list/PropertyListPage'
      ),
    permissionRequired: permissions.propertyRead,
    exact: true,
  },
  {
    path: '/admin/property/new',
    i18n: 'property.new.title',
    parent: '/admin/property',
    loader: () =>
      import(
        'src/view/admin/property/form/PropertyFormPage'
      ),
    permissionRequired: permissions.propertyCreate,
    exact: true,
  },
  {
    path: '/admin/property/importer',
    i18n: 'property.importer.title',
    parent: '/admin/property',
    loader: () =>
      import(
        'src/view/admin/property/importer/PropertyImporterPage'
      ),
    permissionRequired: permissions.propertyImport,
    exact: true,
  },
  {
    path: '/admin/property/:id/edit',
    i18n: 'property.edit.title',
    parent: '/admin/property',
    loader: () =>
      import(
        'src/view/admin/property/form/PropertyFormPage'
      ),
    permissionRequired: permissions.propertyEdit,
    exact: true,
  },
  {
    path: '/admin/property/:id',
    i18n: 'property.view.title',
    parent: '/admin/property',
    loader: () =>
      import(
        'src/view/admin/property/view/PropertyViewPage'
      ),
    permissionRequired: permissions.propertyRead,
    exact: true,
  },
].filter(Boolean);

const customerRoutes = [
  {
    path: '/customer',
    i18n: 'dashboard.menu',
    loader: () => import('src/view/customer/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/customer/person-name-breadcrumb',
    collapseName: 'my-profile',
    i18n: 'roles.customer.label',
    parent: '/customer',
    redirect: '/customer/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/customer/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/customer/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/customer/password-change',
    collapseName: 'my-profile',
    i18n: 'auth.passwordChange.title',
    parent: '/customer/person-name-breadcrumb',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/customer/verification',
    collapseName: 'my-profile',
    i18n: 'customer.verification.menu',
    parent: '/customer/person-name-breadcrumb',
    loader: () =>
      import(
        'src/view/customer/verification/VerificationPage'
      ),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/customer/investment',
    i18n: 'customer.investment.menu',
    parent: '/customer',
    loader: () =>
      import('src/view/customer/InvestmentPage'),
    permissionRequired: permissions.propertyRead,
    exact: true,
  },

  {
    path: '/customer/transaction',
    i18n: 'customer.transaction.menu',
    parent: '/customer',
    loader: () =>
      import(
        'src/view/customer/transaction/TransactionPage'
      ),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/customer/property',
    i18n: 'customer.property.menu',
    parent: '/customer',
    loader: () => import('src/view/customer/PropertyPage'),
    permissionRequired: permissions.propertyRead,
    exact: true,
  },

  {
    path: '/customer/marketplace',
    i18n: 'customer.marketplace.menu',
    parent: '/customer',
    loader: () =>
      import('src/view/customer/MarketplacePage'),
    permissionRequired: permissions.propertyRead,
    exact: true,
  },

  {
    path: '/customer/contact',
    i18n: 'customer.contact.menu',
    parent: '/customer',
    loader: () => import('src/view/customer/ContactPage'),
    permissionRequired: null,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/admin/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/admin/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/admin/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
  {
    path: '/',
    loader: () => import('src/view/auth/SignupPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/admin/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/admin/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  adminRoutes,
  customerRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};

export function findRoute(url = null, routes = []) {
  return (
    !!url &&
    (routes.find((route) => url === route.path) ||
      routes.find(
        (route) =>
          /\/:[\w\d_-]+/g.test(route.path) &&
          new RegExp(
            `^${route.path.replace(
              /:[\w\d_-]+/g,
              '[\\w\\d]+',
            )}$`,
          ).test(url),
      ))
  );
}

export function matchedAdminRoutes(
  url = null,
  exactOnly = false,
) {
  if (url === null || url === undefined) {
    return null;
  }

  let routes = [];

  const searchRouteStack = (url, exactOnly) => {
    const found = findRoute(url, adminRoutes);

    if (exactOnly === true) {
      return found;
    }

    if (found) {
      routes.push(found);
      if (found.parent && found.parent !== '/admin') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}

export function matchedCustomerRoutes(
  url = null,
  exactOnly = false,
) {
  if (url === null || url === undefined) {
    return null;
  }

  let routes = [];

  const searchRouteStack = (url, exactOnly) => {
    const found = findRoute(url, customerRoutes);

    if (exactOnly === true) {
      return found;
    }

    if (found) {
      routes.push(found);
      if (found.parent && found.parent !== '/customer') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}
