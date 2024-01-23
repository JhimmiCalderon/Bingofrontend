import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute() {
    // Accede al contexto de autenticación
    const auth = useAuth();
  
    // Renderiza el contenido (Outlet) solo si el usuario está autenticado, de lo contrario, redirige a la página de inicio
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  }
  