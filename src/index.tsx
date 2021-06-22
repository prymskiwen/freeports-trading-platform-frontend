import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import authActions from "./store/auth/actions";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import configureAppStore from "./store";
import Loader from "./components/Loader";

const App = React.lazy(
  () =>
    import(
      process.env.REACT_APP_INTERFACE === "CLEARER"
        ? "./clearer/App"
        : "./organization/App"
    )
);

const { authCheck } = authActions;

const store = configureAppStore();
store.dispatch(authCheck());

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
