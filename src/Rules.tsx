import React, { useState, useRef } from 'react';
import './css/Rules.css';

const MyComponent: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(1);

  const handleButtonClick = (cardNumber: number) => {
    setActiveCard(cardNumber);
  };

  const cardOneRef = useRef<HTMLDivElement>(null);
  const cardTwoRef = useRef<HTMLDivElement>(null);
  const cardThreeRef = useRef<HTMLDivElement>(null);
  const cardFourRef = useRef<HTMLDivElement>(null);
  const cardFiveRef = useRef<HTMLDivElement>(null);
  const cardSixRef = useRef<HTMLDivElement>(null);
  const cardSevenRef = useRef<HTMLDivElement>(null);
  const cardEightRef = useRef<HTMLDivElement>(null);

  const handleButtonOneClick = () => {
    if (cardOneRef.current && cardTwoRef.current) {
      cardOneRef.current.classList.remove('active');
      cardOneRef.current.classList.add('inactive');

      cardTwoRef.current.classList.remove('inactive');
      cardTwoRef.current.classList.add('active');
    }
  };

  const handleButtonTwoClick = () => {
    if (cardTwoRef.current && cardThreeRef.current) {
      cardTwoRef.current.classList.remove('active');
      cardTwoRef.current.classList.add('inactive');

      cardThreeRef.current.classList.remove('inactive');
      cardThreeRef.current.classList.add('active');
    }
  };

  const handleButtonThreeClick = () => {
    if (cardThreeRef.current && cardFourRef.current) {
      cardThreeRef.current.classList.remove('active');
      cardThreeRef.current.classList.add('inactive');

      cardFourRef.current.classList.remove('inactive');
      cardFourRef.current.classList.add('active');
    }
  };

  const handleButtonFourClick = () => {
    if (cardFourRef.current && cardFiveRef.current) {
      cardFourRef.current.classList.remove('active');
      cardFourRef.current.classList.add('inactive');

      cardFiveRef.current.classList.remove('inactive');
      cardFiveRef.current.classList.add('active');
    }
  };

  const handleButtonFiveClick = () => {
    if (cardFiveRef.current && cardSixRef.current) {
      cardFiveRef.current.classList.remove('active');
      cardFiveRef.current.classList.add('inactive');

      cardSixRef.current.classList.remove('inactive');
      cardSixRef.current.classList.add('active');
    }
  };

  const handleButtonSixClick = () => {
    if (cardSixRef.current && cardSevenRef.current) {
      cardSixRef.current.classList.remove('active');
      cardSixRef.current.classList.add('inactive');

      cardSevenRef.current.classList.remove('inactive');
      cardSevenRef.current.classList.add('active');
    }
  };

  const handleButtonSevenClick = () => {
    if (cardSevenRef.current && cardEightRef.current) {
      cardSevenRef.current.classList.remove('active');
      cardSevenRef.current.classList.add('inactive');

      cardEightRef.current.classList.remove('inactive');
      cardEightRef.current.classList.add('active');
    }
  };

  return (
    <div className="contenedor">
    <div ref={cardOneRef} className={`carta one ${activeCard === 1 ? 'active' : ''}`}>
      <div className="numero-bg"></div>
      <div className="numero">1</div>
      <div className="texto">
        <span className="line">Descalificación</span>

        <p>Si un usuario presiona el botón de Bingo sin haber ganado<br /> será descalificado y automáticamente .</p>
      </div>
      <div className={`button one ${activeCard === 1 ? 'active' : ''}`} onClick={handleButtonOneClick}>
        Ok
      </div>
    </div>

    <div ref={cardTwoRef} className={`carta two ${activeCard === 2 ? 'active' : ''}`}>
      <div className="numero-bg"></div>
      <div className="numero">2</div>
      <div className="texto">
        <span className="line">Victoria</span>
        <p>logre ganar en el Bingo,notificará a los demás participantes y el juego<br /> se cerrará de manera automática.</p>
      </div>
      <div className={`button two ${activeCard === 2 ? 'active' : ''}`} onClick={handleButtonTwoClick}>
        Ok
      </div>
    </div>

    <div ref={cardThreeRef} className={`carta three ${activeCard === 3 ? 'active' : ''}`}>
    <div className="numero-bg"></div>
      <div className="numero">3</div>
      <div className="texto">
        <span className="line">Jugadas Ganadoras</span>
        <p>Cartón Pleno, Diagonal Triunfante, Horizontal Dominante <br />Cuatro Esquinas , Vertical Triunfal  </p>
      </div>
      <div className={`button three ${activeCard === 3 ? 'active' : ''}`} onClick={handleButtonThreeClick}>
        Ok
      </div>
      
    </div>
  </div>
  
);
};
  


export default MyComponent;
