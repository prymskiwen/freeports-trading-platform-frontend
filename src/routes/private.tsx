/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import { useAuth } from "../hooks";
import RouteCompProps from "./routeCompProps";

const PrivateRoute: React.FC<RouteCompProps> = ({
  component: Component,
  ...rest
}: RouteCompProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Suspense fallback={<CircularProgress color="primary" />}>
            {isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )}
          </Suspense>
        );
      }}
    />
  );
};

export default PrivateRoute;
