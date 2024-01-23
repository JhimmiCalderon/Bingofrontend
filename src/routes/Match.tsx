import React, { useState, useEffect } from 'react';
import HomeLayout from "../layout/Layout";
import BingoCard from "../BingoCard";
import NumberBalota from "../NumberBalota";
import List from "../User";
import CustomBingoNumberGenerator from '../generators/CustomBingoNumberGenerator';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Match() {
  const { isAuthenticated, getUser } = useAuth();
  const [isButtonVisible, setButtonVisibility] = useState(true);
  const [username, setUsername] = useState(getUser()?.name || "");
  const [winner, setWinner] = useState("true");
  const [card, setCard] = useState([]);
  const [errorResponse, setErrorResponse] = useState('');
  const [showBingoWord, setShowBingoWord] = useState(false);
  const goTo = useNavigate();
  const [currentNumber, setCurrentNumber] = useState<{ column: string; value: number } | null>(null);
  const customBingoGenerator = new CustomBingoNumberGenerator();
  const [isWinner, setIsWinner] = useState(false);

  const handleStart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:3000/bingo/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, winner,card}),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        setButtonVisibility(false);
        setUsername('');
        setWinner("true");
        setCard([]);
        setShowBingoWord(true);
        console.log('Bingo creado exitosamente');
      } else {
        console.log('Error al crear el Bingo');
        // Update the errorResponse state based on the server response if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Update the errorResponse state based on the error if needed
    }
  };

 
  // ...

const handleWin = () => {
  setIsWinner(true);
};

return (
  <HomeLayout>
    <form className="centered-form" onSubmit={handleStart}>
      <br />
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      {isButtonVisible && <button className="styled-button primary" type="submit">Empezar</button>}
      <br />
    </form>

    {showBingoWord && (
      <>
        
        {isWinner !== null && (
          <button className="styled-button primary" onClick={() => alert(isWinner ? 'Usted ganó' : 'Usted perdió/no habia ganado ')}>Bingo</button>
        )}
      </>
    )}

    <NumberBalota currentNumber={currentNumber} />
    <BingoCard onWin={handleWin} />
    <List />
  </HomeLayout>
);
        }