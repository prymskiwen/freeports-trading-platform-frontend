/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// import libs
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

// import components
import routes from "./routes";
import PrivateRoute from "../../routes/private";
import PublicRoute from "../../routes/public";
import Header from "../components/Header";
import { RootState } from "../../util/types/RootState";

const Routes = (): React.ReactElement => {
  const { error } = useSelector((state: RootState) => {
    console.log("state ...........", state);
    return {
      error: state?.global.error,
    };
  }, shallowEqual);

  return (
    <div>
      <Router>
        <>
          <Header />
          <Switch>
            {routes.map((route, i) => {
              if (route.auth) {
                return <PrivateRoute key={i} {...route} />;
              }
              // if (error.errorType !== "") return <Redirect to="/error" />;
              return <PublicRoute key={i} {...route} />;
            })}
            <Redirect to="/dashboard" />
          </Switch>
        </>
      </Router>
    </div>
  );
};

export default Routes;
