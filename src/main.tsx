import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from "./routes/Login.tsx"
import Home from "./routes/Home.tsx"
import Lobby from "./routes/Lobby.tsx"
import Match from "./routes/Match.tsx"
import Signup from "./routes/Signup.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import './css/index.css'
// Configuración del enrutador
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Ruta para la página de inicio de sesión
  },
  {
    path: '/signup',
    element: <Signup />, // Ruta para la página de registro
  },
  {
    path: '/',
    element: <ProtectedRoute />, // Ruta protegida, requiere autenticación
    children: [
      {
        path: '/home',
        element: <Home />, // Ruta para la página principal
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/lobby',
        element: <Lobby />, // Ruta para la página de lobby
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/match',
        element: <Match />, // Ruta para la página de partido
      },
    ],
  },
]);

// Renderizar la aplicación en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Proporcionar el enrutador y la autenticación a la aplicación */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
