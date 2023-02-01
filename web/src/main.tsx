import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./main.css";
import { UserProvider } from "./hooks/UserContext";
import { PageProvider } from "./hooks/PageContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PageProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PageProvider>
  </React.StrictMode>
);
