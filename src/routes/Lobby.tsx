import React, { useState, useEffect } from "react";
import HomeLayout from "../layout/Layout";
import Rules from "../Rules"


import { Link } from "react-router-dom";

export default function Lobby() {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000); // Actualiza cada 1 segundo (1000 milisegundos)

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
          <Link to="/match">
          
            <button className="btn" >Crear Tarjeton</button>
            
          </Link>
          </div>
          </div>
        )}
          <Rules/>
          
      </form>
      
    </HomeLayout>
    
  );
}
