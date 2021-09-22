import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkPermission } from "../components/Mounter/Mounter";

function ProtectedRoute({
  component: Component,
  requiredRoles: requiredRoles,
  ...rest
}) {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          user.isAuthenticated &&
          checkPermission(user.user.role.name, requiredRoles)
        ) {
          return <Component {...props} />;
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
