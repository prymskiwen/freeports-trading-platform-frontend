import React from "react";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import store from "../store";

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

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>Hello From Organization interface</Provider>
    </ThemeProvider>
  );
};

export default App;
