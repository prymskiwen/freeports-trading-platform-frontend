/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// import libs
import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

// import components
import routes from "./routes";
import PrivateRoute from "./private";
import PublicRoute from "./public";
import Header from "../components/Header";

const Routes = (): React.ReactElement => {
  return (
    <div>
      {" "}
      {/* <Loader display={display} /> */}
      <Router>
        <>
          <Header />
          <Switch>
            {" "}
            {routes.map((route, i) => {
              if (route.auth) {
                return <PrivateRoute key={i} {...route} />;
              }
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
