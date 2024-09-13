import React from "react";
import ReactDOM from "react-dom/client";
import { EadProvider } from "./Context/EadContext.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EadProvider>
      <App />
    </EadProvider>
  </React.StrictMode>
);
