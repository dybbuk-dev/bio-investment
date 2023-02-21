import PermissionChecker from 'src/modules/auth/permissionChecker';
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import Layout from 'src/view/layout/Layout';

function AdminRoute({
  component: Component,
  currentUser,
  permissionRequired,
  ...rest
}) {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => {
        const permissionChecker = new PermissionChecker(
          currentUser,
        );

        if (!permissionChecker.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/admin/auth/signin',
                state: { from: location },
              }}
            />
          );
        }

        if (!permissionChecker.isAdmin) {
          return <Redirect to="/customer" />;
        }

        if (!permissionChecker.isEmailVerified) {
          return <Redirect to="/email-unverified" />;
        }

        if (permissionChecker.isEmptyPermissions) {
          return <Redirect to="/empty-permissions" />;
        }

        if (!permissionChecker.match(permissionRequired)) {
          return <Redirect to="/admin/403" />;
        }

        return (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

export default AdminRoute;
