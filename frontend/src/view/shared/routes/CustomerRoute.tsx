import PermissionChecker from 'src/modules/auth/permissionChecker';
import React from 'react';
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom';
import Layout from 'src/view/layout/Layout';

function CustomerRoute({
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
                pathname: '/signin',
                state: { from: location },
              }}
            />
          );
        }

        if (permissionChecker.isAdmin) {
          return <Redirect to="/admin" />;
        }

        if (!permissionChecker.isEmailVerified) {
          return <Redirect to="/email-unverified" />;
        }

        return (
          <Layout isCustomer={true} {...props}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

export default CustomerRoute;
