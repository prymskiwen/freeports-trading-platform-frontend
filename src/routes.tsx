import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Organisations from "./components/Organisations";
import NostroAccounts from "./components/NostroAccounts";
import Tracking from "./components/Tracking";

const Routes = (): React.ReactElement => {
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/organisations">
            <Organisations />
          </Route>
          <Route path="/nostro-accounts">
            <NostroAccounts />
          </Route>
          <Route path="/tracking">
            <Tracking />
          </Route>
          <Redirect to="/dashboard" />
        </Switch>
      </>
    </Router>
  );
};

export default Routes;
