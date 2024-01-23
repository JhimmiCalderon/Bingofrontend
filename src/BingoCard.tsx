import React, { useCallback, useMemo, useState } from 'react';
import './css/Card.css';

interface BingoCardProps {
  onWin: () => void; 
}

const BINGO: string[] = ['B', 'I', 'N', 'G', 'O'];

const getRndInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface Column {
  character: string;
  numbers: number[];
}

const BingoCard: React.FC<BingoCardProps> = ({ onWin }) => {
  const [numbersChecked, setNumbersChecked] = useState<number[]>([]);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [cardInfo, setCardInfo] = useState([]);
  const generateNumbers = useCallback((column: number): number[] => {
    const max = (column + 1) * 15;
    const min = column ? column * 15 + 1 : 1;
    let numbers: number[] = [
      ...new Set([...new Array(5)].map(() => getRndInteger(min, max))),
    ];

    while (numbers.length !== 5) {
      numbers = [
        ...new Set([...new Array(5)].map(() => getRndInteger(min, max))),
      ];
    }

    return numbers.sort((a, b) => a - b);
  }, []);

  const data: Column[] = useMemo(
    () =>
      BINGO.map((currentCharacter, columnIndex) => ({
        character: currentCharacter,
        numbers: generateNumbers(columnIndex),
      })),
    [generateNumbers]
  );

  const checkVerticalWin = useCallback((): boolean => {
    for (let col = 0; col < 5; col++) {
      const colNumbers = data[col].numbers;
      if (colNumbers.every((number) => numbersChecked.includes(number))) {
        console.log('¡Victoria vertical!');
        return true;
      }
    }
    return false;
  }, [data, numbersChecked]);

  const checkHorizontalWin = useCallback((): boolean => {
    for (let row = 0; row < 5; row++) {
      const rowNumbers = data.map((column) => column.numbers[row]);
      if (rowNumbers.every((number) => numbersChecked.includes(number))) {
        console.log('¡Victoria horizontal!');
        return true;
      }
    }
    return false;
  }, [data, numbersChecked]);

  const checkFourCornersWin = useCallback((): boolean => {
    const corners = [
      data[0].numbers[0],
      data[0].numbers[4],
      data[4].numbers[0],
      data[4].numbers[4],
    ];

    return corners.every((number) => numbersChecked.includes(number));
  }, [data, numbersChecked]);

  const checkFullHouseWin = useCallback((): boolean => {
    const allNumbers = data.flatMap((column) => column.numbers);
    return allNumbers.every((number) => numbersChecked.includes(number));
  }, [data, numbersChecked]);

  const checkDiagonalWin = useCallback((): boolean => {
    const diagonal1 = [data[0].numbers[0], data[1].numbers[1], data[2].numbers[2], data[3].numbers[3], data[4].numbers[4]];
    const diagonal2 = [data[0].numbers[4], data[1].numbers[3], data[2].numbers[2], data[3].numbers[1], data[4].numbers[0]];

    return diagonal1.every((number) => numbersChecked.includes(number)) || diagonal2.every((number) => numbersChecked.includes(number));
  }, [data, numbersChecked]);

  const handleOnNumberClick = useCallback((number: number) => {
    setNumbersChecked((oldState) => {
      let newNumbersChecked: number[] = [...oldState];

      if (newNumbersChecked.includes(number)) {
        newNumbersChecked = newNumbersChecked.filter((n) => n !== number);
      } else {
        newNumbersChecked.push(number);
      }

      if (checkVerticalWin() || checkHorizontalWin() || checkFourCornersWin() || checkFullHouseWin() || checkDiagonalWin()) {
        console.log('¡Has ganado!');
        setIsWinner(true);
        onWin(); 
      }

      return newNumbersChecked;
    });
  }, [checkVerticalWin, checkHorizontalWin, checkFourCornersWin, checkFullHouseWin, checkDiagonalWin,onWin]);

  return (
    <div className="bingo-card">
      {data.map((column, columnIndex) => (
        <div className="column" key={column.character}>
          <p className="cell header">{column.character}</p>
          {column.numbers.map((number, numberIndex) => (
            <div
              className={`cell${numbersChecked.includes(number) ? ' checked' : ''}`}
              key={`${column.character}_${number}`}
              onClick={() =>
                columnIndex === 2 && numberIndex === 2
                  ? null
                  : handleOnNumberClick(number)
              }
            >
              {numbersChecked.includes(number) ? (
                <div className="buddha-silhouette"></div>
              ) : (
                <p>{columnIndex === 2 && numberIndex === 2 ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1WuBy0rSE5CTAIGzttairs0w0MsF1yEZV4S6asotShWG2pSr25H3djwTBcGcT2IVIfk&usqp=CAU" alt="FREE" style={{ width: '100%', height: '100%' }} /> : number}</p>
              )}
            </div>
          ))}
        </div>
      ))}
      {isWinner && <p className="winner-message"></p>}
    </div>
  );
};

export default BingoCard;
