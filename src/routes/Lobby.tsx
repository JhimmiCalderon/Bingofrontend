import React, { useState, useEffect } from "react";
import HomeLayout from "../layout/Layout";
import Rules from "../Rules"
import { Link } from "react-router-dom";

export default function Lobby() {
  // Estado local para el temporizador de cuenta regresiva
  const [countdown, setCountdown] = useState(30);

  // Efecto que actualiza el temporizador cada segundo
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000); // Actualiza cada 1 segundo (1000 milisegundos)

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <HomeLayout>
      <form action="">
        <h1>El juego comienza en </h1>
        
        {countdown > 0 ? (
          <h2>{countdown} Segundos...</h2>
        ) : (
          <div className="form">
            <div className="none">
              {/* Enlace para redirigir al usuario a la pantalla de creación de tarjetón */}
              <Link to="/match">
                <button className="btn">Crear Tarjetón</button>
              </Link>
            </div>
          </div>
        )}

        {/* Componente de reglas del juego */}
        <Rules />
      </form>
    </HomeLayout>
  );
}
