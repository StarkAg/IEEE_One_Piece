import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

if (currentPath === "/quiz") {
  window.location.replace(`/quiz/index.html${window.location.search}${window.location.hash}`);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
