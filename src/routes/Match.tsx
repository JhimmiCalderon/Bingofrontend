import React, { useState, useEffect } from 'react';
import HomeLayout from "../layout/HomeLayout";
import BingoCard from "../BingoCard";
import NumberBalota from "../NumberBalota";
import CustomBingoNumberGenerator from '../generators/CustomBingoNumberGenerator';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
// Match.tsx
// ... (importaciones y código previo)

export default function Match() {
  const { isAuthenticated, getUser } = useAuth();
  const [isButtonVisible, setButtonVisibility] = useState(true);
  const [username, setUsername] = useState(getUser()?.name || "");
  const [winner, setWinner] = useState("false");
  const [errorResponse, setErrorResponse] = useState('');
  const goTo = useNavigate();
  const [currentNumber, setCurrentNumber] = useState<{ column: string; value: number } | null>(null);
  const customBingoGenerator = new CustomBingoNumberGenerator();

  async function handleStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username,  winner);

    try {
      const response = await fetch('http://localhost:3000/bingo/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username,  winner }),  // Envía también la tarjeta de bingo
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setButtonVisibility(false)
        setUsername('');
        setWinner("");
        console.log('Bingo creado exitosamente');
        goTo('/match');
      } else {
        console.log('Error al crear el Bingo');
        // Update the errorResponse state based on the server response if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Update the errorResponse state based on the error if needed
    }
  }

   useEffect(() => {
     const intervalId = setInterval(() => {
       const columnas = ['B', 'I', 'N', 'G', 'O'];
       const columnaAleatoria = columnas[Math.floor(Math.random() * columnas.length)];
       const numeroAleatorio = customBingoGenerator.getRandomBingoNumber(columnaAleatoria);
 
       // Actualiza el número actual en el estado con la letra de la columna
       setCurrentNumber({ column: columnaAleatoria, value: numeroAleatorio });
     }, 5000);
 
     // Limpia el intervalo al desmontar el componente
     return () => clearInterval(intervalId);
   }, []); // El efecto se ejecuta una vez al montar el componente
 
   return (
     <HomeLayout>
         <form className="form" onSubmit={handleStart}>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        {isButtonVisible && <button type="submit">Crear Tarjeton</button>}
      </form>
       <form action="form">
         <h1>Imprime Balota B7</h1>
         <h1>nombre jugadores </h1>
         <h2>card</h2>
         <button>Bingo</button>
         {/* Muestra el número actual en NumberBalota con la letra de la columna */}
         <NumberBalota currentNumber={currentNumber} />
         <BingoCard />
       </form>
     </HomeLayout>
   );
 }
 