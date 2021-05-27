import React, { useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import Store from "./store";

function App() {
  const store = useContext(Store);
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
      <div className="App">{store.title}</div>
    </ThemeProvider>
  );
}

export default App;
