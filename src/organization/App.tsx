import React from "react";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import Routes from "./routes";
// import store from "../store";
import auth from "../store/auth/reducer";
import global from "../store/global/reducer";
import { useInjectReducer } from "../util/redux-injectors";
import "./App.css";
import "./Custom.css";

const App = (): React.ReactElement => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  useInjectReducer({ key: "auth", reducer: auth });
  useInjectReducer({ key: "global", reducer: global });
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
