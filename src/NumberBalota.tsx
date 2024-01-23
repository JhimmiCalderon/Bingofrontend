// NumberBalota.tsx
import React, { useState, useEffect } from 'react';
import "./css/Balota.css"

/**
 * Generador de Números Personalizado para Bingo
 * 
 * Proporciona un método para obtener un número aleatorio asociado a una columna del bingo.
 */
const customBingoGenerator = {
  /**
   * Obtener Número Aleatorio de Bingo
   * 
   * @param column - La columna para la cual se desea obtener un número aleatorio ('B', 'I', 'N', 'G', 'O').
   * @returns Número aleatorio asociado a la columna especificada.
   * @throws Error si la columna no es válida.
   */
  getRandomBingoNumber: (column: string) => {
    // Verifica que la columna sea válida
    if (!['B', 'I', 'N', 'G', 'O'].includes(column)) {
      throw new Error('Columna no válida');
    }

    // Genera un número aleatorio en función de la columna
    switch (column) {
      case 'B':
        return Math.floor(Math.random() * 15) + 1; // Números del 1 al 15 para la columna B
      case 'I':
        return Math.floor(Math.random() * 15) + 16; // Números del 16 al 30 para la columna I
      case 'N':
        return Math.floor(Math.random() * 15) + 31; // Números del 31 al 45 para la columna N
      case 'G':
        return Math.floor(Math.random() * 15) + 46; // Números del 46 al 60 para la columna G
      case 'O':
        return Math.floor(Math.random() * 15) + 61; // Números del 61 al 75 para la columna O
      default:
        throw new Error('Columna no válida');
    }
  }
};

/**
 * Props del Componente NumberBalota
 */
interface NumberBalotaProps {
  currentNumber: { column: string; value: number } | null;
}

/**
 * Componente NumberBalota
 * 
 * Muestra la balota actual en un juego de bingo, con la letra de la columna y el número asociado.
 */
const NumberBalota: React.FC<NumberBalotaProps> = () => {
  // Estado para almacenar el número actual
  const [currentNumber, setCurrentNumber] = useState<{ column: string; value: number } | null>(null);

  // Efecto que se ejecuta una vez al montar el componente
  useEffect(() => {
    // Intervalo que se ejecuta cada 5 segundos
    const intervalId = setInterval(() => {
      // Columnas de un juego de bingo
      const columnas = ['B', 'I', 'N', 'G', 'O'];

      // Selecciona aleatoriamente una columna
      const columnaAleatoria = columnas[Math.floor(Math.random() * columnas.length)];

      // Genera un número aleatorio utilizando el generador personalizado
      const numeroAleatorio = customBingoGenerator.getRandomBingoNumber(columnaAleatoria);

      // Actualiza el número actual en el estado con la letra de la columna
      setCurrentNumber({ column: columnaAleatoria, value: numeroAleatorio });
    }, 5000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El efecto se ejecuta una vez al montar el componente

  // Renderiza el componente con el número actual
  return (
    <div>
      {/* Muestra la letra de la columna y el número actual */}
      <h3>Balota Actual:</h3>
      <div className='balota'>
        {currentNumber !== null ? `${currentNumber.column} ${currentNumber.value}` : 'Esperando...'}
      </div>
    </div>
  );
};

export default NumberBalota;
