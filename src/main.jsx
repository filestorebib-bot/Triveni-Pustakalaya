import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./App.css";

/*
========================================
SERVICE WORKER / OFFLINE PWA
========================================
*/

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });

      console.log(
        "Triveni Pustakalaya Service Worker registered:",
        registration.scope
      );

      // Check for the latest service worker version
      registration.update();

      /*
      ========================================
      INTERNET CONNECTION RESTORED
      ========================================
      */

      window.addEventListener("online", () => {
        console.log(
          "Internet connected - checking for Triveni Pustakalaya updates..."
        );

        registration.update();
      });
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}

/*
========================================
REACT APPLICATION
========================================
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
