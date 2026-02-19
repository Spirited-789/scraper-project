import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HeroSection from "./components/hero-section";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

// Handle the redirect response when Microsoft sends the user back
msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().then((response) => {
    if (response) {
      // User just logged in via Microsoft redirect
      localStorage.setItem("token", response.idToken);
      window.location.href = "/home";
    }
  }).catch((error) => {
    console.error("Redirect error:", error);
  });

  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
});
