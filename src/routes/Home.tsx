import React, { useState, useEffect } from "react";
import HomeLayout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';

export default function Home() {
  // Funciones y estados proporcionados por el contexto de autenticación
  const { isAuthenticated, getUser } = useAuth();

  // Estados locales para gestionar la información del formulario
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState(getUser()?.name || ""); // Inicializa con el nombre del usuario si está autenticado
  const [winner, setWinner] = useState("false");
  const [status, setStatus] = useState("En espera");
 
  // Navegador de React Router para redireccionar a otras páginas
  const goTo = useNavigate();

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      const user = getUser();
      console.log('Nombre del usuario:', user?.name);
      // Puedes realizar acciones adicionales al autenticar al usuario
    } else {
      // El usuario no está autenticado, puedes redirigir o realizar acciones necesarias
    }
  }, [isAuthenticated, getUser]);

  // Manejador de evento para el envío del formulario
  async function handleStartGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, roomId, status, winner);

    try {
      const response = await fetch("http://localhost:3000/bingo/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, roomId, status, winner }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setRoomId("");
        setStatus("");
        setWinner("");
        console.log("Lobby creado exitosamente");
        goTo("/lobby");
      } else {
        console.log("Error al crear el lobby");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <HomeLayout>
      {isAuthenticated ? (
        <h1>¡Hola, {getUser()?.name}!</h1>
      ) : (
        <div>No autenticado</div>
      )}

      {/* Formulario para crear una sala de juego */}
      <form onSubmit={handleStartGame}>
        <div className="form">
          <div className="username">
            <input 
              type="text" 
              name="roomId" 
              placeholder="SALA N°" 
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)} 
              autoComplete="off"
            />
          </div>
          
          <div className="login">
            <button>Crear Sala</button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}
