import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

// state
import store from "./app/store";
import { Provider } from "react-redux";

import "./index.scss";
import "macro-css";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
