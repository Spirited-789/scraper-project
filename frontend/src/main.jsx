import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HeroSection from "./components/hero-section";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Login /> */}
    {/* <Signup /> */}
  </StrictMode>
);
