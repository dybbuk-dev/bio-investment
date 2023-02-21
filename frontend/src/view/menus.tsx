import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import config from 'src/config';
import { Icon } from '@mui/material';

const permissions = Permissions.values;

const adminMenu = [
  {
    path: '/admin',
    exact: true,
    icon: <Icon>dashboard</Icon>,
    name: i18n('dashboard.menu'),
    permissionRequired: null,
  },

  {
    path: '/admin/customer',
    name: i18n('customer.menu'),
    icon: <Icon>account_box</Icon>,
    permissionRequired: permissions.customerRead,
  },

  {
    path: '/admin/property',
    icon: <Icon>apartment</Icon>,
    name: i18n('property.menu'),
    permissionRequired: permissions.propertyRead,
  },

  {
    path: '/admin/audit-log',
    name: i18n('auditLog.menu'),
    permissionRequired: permissions.auditLogRead,
    icon: <Icon>restore</Icon>,
  },
].filter(Boolean);

const adminProfileRoutes = [
  {
    name: i18n('auth.profile.title'),
    path: '/admin/profile',
    icon: <Icon>person_outline</Icon>,
  },
  {
    name: i18n('auth.passwordChange.title'),
    path: '/admin/password-change',
    icon: <Icon>lock</Icon>,
  },
].filter(Boolean);

const userEditRoutes = [
  {
    path: '/admin/admin',
    name: i18n('user.menu'),
    icon: <Icon>person</Icon>,
  },
].filter(Boolean);

const customerMenu = [
  {
    path: '/customer',
    exact: true,
    icon: <Icon>dashboard</Icon>,
    name: i18n('dashboard.menu'),
    permissionRequired: null,
  },

  {
    path: '/customer/investment',
    exact: true,
    icon: <Icon>location_city</Icon>,
    name: i18n('customer.investment.menu'),
    permissionRequired: permissions.propertyRead,
  },

  {
    path: '/customer/transaction',
    exact: true,
    icon: <Icon>restore</Icon>,
    name: i18n('customer.transaction.menu'),
    permissionRequired: null,
  },

  {
    path: '/customer/property',
    exact: true,
    icon: <Icon>apartment</Icon>,
    name: i18n('customer.property.menu'),
    permissionRequired: permissions.propertyRead,
  },

  {
    path: '/customer/marketplace',
    exact: true,
    icon: <Icon>business</Icon>,
    name: i18n('customer.marketplace.menu'),
    permissionRequired: null,
  },

  {
    path: '/customer/contact',
    exact: true,
    icon: <Icon>contacts</Icon>,
    name: i18n('customer.contact.menu'),
    permissionRequired: null,
  },
].filter(Boolean);

const customerProfileRoutes = [
  {
    name: i18n('auth.profile.title'),
    path: '/customer/profile',
    icon: <Icon>person_outline</Icon>,
  },
  {
    name: i18n('auth.passwordChange.title'),
    path: '/customer/password-change',
    icon: <Icon>lock</Icon>,
  },
  {
    name: i18n('customer.verification.menu'),
    path: '/customer/verification',
    icon: <Icon>security</Icon>,
  },
].filter(Boolean);

export {
  adminMenu,
  adminProfileRoutes,
  userEditRoutes,
  customerMenu,
  customerProfileRoutes,
};
