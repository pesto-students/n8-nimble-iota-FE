import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkPermission } from "../components/Mounter/Mounter";

function ProtectedRoute(properties) {
  const user = useSelector((state) => state.user);
  return (
    <Route
      exact={properties.exact}
      path={properties.path}
      render={(props) => {
        if (
          user.isAuthenticated &&
          checkPermission(user.user.role.name, properties.requiredRoles)
        ) {
          return <properties.component {...props} />;
        }
        if (!user.isAuthenticated) {
          return <Redirect to="/signin" />;
        }
        return <Redirect to="/404" />;
      }}
    />
  );
}

export default ProtectedRoute;
