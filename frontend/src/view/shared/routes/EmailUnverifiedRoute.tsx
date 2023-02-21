import PermissionChecker from 'src/modules/auth/permissionChecker';
import { Redirect, Route } from 'react-router-dom';

function EmailUnverifiedRoute({
  component: Component,
  currentUser,
  ...rest
}) {
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
                pathname: '/signin',
              }}
            />
          );
        }

        if (permissionChecker.isEmailVerified) {
          if (permissionChecker.isAdmin) {
            return <Redirect to="/admin" />;
          } else {
            return <Redirect to="/customer" />;
          }
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default EmailUnverifiedRoute;
