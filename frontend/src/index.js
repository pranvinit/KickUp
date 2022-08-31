import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Contexts imports
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
