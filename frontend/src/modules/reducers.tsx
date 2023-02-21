import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import admin from 'src/modules/admin/adminReducers';
import customer from 'src/modules/customer/customerReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import property from 'src/modules/property/propertyReducers';
import dashboard from 'src/modules/dashboard/dashboardReducers';
import { combineReducers } from 'redux';
import form from 'src/modules/form/formReducers';
import mui from 'src/modules/mui/muiReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    form,
    mui,
    layout,
    auth,
    admin,
    customer,
    auditLog,
    property,
    dashboard,
  });
