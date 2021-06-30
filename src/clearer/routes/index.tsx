/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
// import libs
import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

// import components
import routes from "./routes";
import PrivateRoute from "../../routes/private";
import PublicRoute from "../../routes/public";
import Header from "../components/Header";
import NotificationCenter from "../../components/NotificationCenter";

const Routes = (): React.ReactElement => {
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  const handleNotificationDrawerOpen = () => {
    setNotificationDrawerOpen(!notificationDrawerOpen);
  };

  const headerProps = {
    notificationDrawerOpen,
    handleNotificationDrawerOpen,
  };
  const drawerProps = {
    notificationDrawerOpen,
    handleNotificationDrawerOpen,
  };

  return (
    <div>
      <Router>
        <>
          <Header {...headerProps} />
          <main>
            <Switch>
              {routes.map((route, i) => {
                if (route.auth) {
                  return <PrivateRoute key={i} {...route} />;
                }
                return <PublicRoute key={i} {...route} />;
              })}
              <Redirect to="/dashboard" />
            </Switch>
          </main>
          <NotificationCenter {...drawerProps} />
        </>
      </Router>
    </div>
  );
};

export default Routes;
