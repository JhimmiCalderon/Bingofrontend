import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from "./routes/Login.tsx"
import Home from "./routes/Home.tsx"
import Lobby from "./routes/Lobby.tsx"
import Match from "./routes/Match.tsx"
import Signup from "./routes/Signup.tsx"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'
import './index.css'
const router = createBrowserRouter([
  {
  path:"/",
  element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
  path:"/",
  element: <ProtectedRoute />,
  children: [
    {
      path:"/home",
      element: <Home />,
    }
  ]
  },
  {
  path:"/",
  element: <ProtectedRoute  />,
  children:[
    {
      path:"/lobby",
      element: <Lobby />,
    }
  ]
  },
  {
  path:"/",
  element: <ProtectedRoute  />,
  children: [
    {
      path:"/match",
      element: <Match />,
    }
  ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
   
 
  
  </React.StrictMode>,
);
