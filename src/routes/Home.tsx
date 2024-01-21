import React, { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [roomId, setRoomid] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("En espera");
 

  const goTo = useNavigate();


  async function handleStartGame(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, roomId, status);
    try {
      const response = await fetch("http://localhost:3000/bingo/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, roomId, status}),
      });

      if (response.ok) {
         const json = (await response.json()) 
        console.log(json);
        setUsername("");
        setRoomid("");
        setStatus("");
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
      <form  onSubmit={handleStartGame}>
        <label>
          Room ID:
          <input
            type="text"
            name="roomId"
            value={roomId}
            onChange={(e) => setRoomid(e.target.value)}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button >
          Iniciar Juego
        </button>
      </form>
    </HomeLayout>
  );
}

