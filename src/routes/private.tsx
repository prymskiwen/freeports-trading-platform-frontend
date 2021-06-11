/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

import { useAuth } from "../hooks";
import RouteCompProps from "./routeCompProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.main,
    },
  })
);
const PrivateRoute: React.FC<RouteCompProps> = ({
  component: Component,
  ...rest
}: RouteCompProps) => {
  const { isAuthenticated } = useAuth();
  const classes = useStyles();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Suspense
            fallback={
              <Backdrop className={classes.backdrop} open={Boolean(true)}>
                <CircularProgress color="primary" />
              </Backdrop>
            }
          >
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
