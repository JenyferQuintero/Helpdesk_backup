import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getRouteConfig } from '../config/routes';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authState } = useContext(AuthContext);
  const routeConfig = getRouteConfig(rest.path);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!routeConfig?.protected) {
          return <Component {...props} />;
        }

        if (!authState.isAuthenticated) {
          return <Redirect to="/login" />;
        }

        if (routeConfig.roles && !routeConfig.roles.includes(authState.user.role)) {
          return <Redirect to="/not-authorized" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;