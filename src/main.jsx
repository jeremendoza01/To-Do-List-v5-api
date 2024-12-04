import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { ProjectProvider } from "./context/ProjectContext";
import { AuthProvider } from './auth/AuthProvider.jsx'
import "./index.css";
import { token } from "./token.js";
import router from "./routes/Router"



localStorage.setItem('token', token);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);