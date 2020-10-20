import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ReduxStore from "./ReduxStore";
import { Provider as ReduxProvider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={ReduxStore}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
