import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Contexts imports
import { AuthContextProvider } from "./context/auth/AuthContext";
import { QueryContextProvider } from "./context/query/QueryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <QueryContextProvider>
      <App />
    </QueryContextProvider>
  </AuthContextProvider>
);
