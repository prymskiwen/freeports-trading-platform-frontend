import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Routes from "./routes";

import auth from "../store/auth/reducer";
import global from "../store/global/reducer";
import Snackbar from "../components/Snackbar";
import { useTheme } from "../hooks";
import { useInjectReducer } from "../util/redux-injectors";

import "./App.css";
import "./Custom.css";

const App = (): React.ReactElement => {
  useInjectReducer({ key: "auth", reducer: auth });
  useInjectReducer({ key: "global", reducer: global });

  const { theme } = useTheme();
  const themeLight = createMuiTheme({
    palette: {
      primary: {
        main: "#006BDE",
      },
      secondary: {
        main: "#6D6E70",
      },
      type: "light",
    },
  });
  const themeDark = createMuiTheme({
    palette: {
      background: {
        default: "#1D1E3C",
      },
      primary: {
        main: "#006BDE",
      },
      secondary: {
        main: "#303655",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
      <Routes />
      <Snackbar />
    </ThemeProvider>
  );
};

export default App;
