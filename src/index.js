import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import "./index.scss";
import "macro-css";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
