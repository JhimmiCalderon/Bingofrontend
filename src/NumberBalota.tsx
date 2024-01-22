// NumberBalota.tsx
import React from 'react';

interface NumberBalotaProps {
  currentNumber: { column: string; value: number } | null;
}

const NumberBalota: React.FC<NumberBalotaProps> = ({ currentNumber }) => {
  return (
    <div>
      {/* Muestra la letra de la columna y el número actual */}
      <p>Número actual: {currentNumber !== null ? `${currentNumber.column} ${currentNumber.value}` : 'Esperando...'}</p>
    </div>
  );
};

export default NumberBalota;
