// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS (Animate On Scroll)
AOS.init({ duration: 1000, once: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Only one BrowserRouter here */}
    <BrowserRouter>
      {/* Context providers wrap the App */}
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
