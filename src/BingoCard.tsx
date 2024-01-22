import React, { useCallback, useMemo, useState } from 'react';

import './Card.css';

interface BingoCardProps {}

const BINGO: string[] = ['B', 'I', 'N', 'G', 'O'];

const getRndInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface Column {
  character: string;
  numbers: number[];
}

const BingoCard: React.FC<BingoCardProps> = () => {
  const [numbersChecked, setNumbersChecked] = useState<number[]>([]);

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

  const handleOnNumberClick = useCallback((number: number) => {
    setNumbersChecked((oldState) => {
      let newNumbersChecked: number[] = [...oldState];

      if (newNumbersChecked.includes(number)) {
        newNumbersChecked = newNumbersChecked.filter((n) => n !== number);
      } else {
        newNumbersChecked.push(number);
      }

      return newNumbersChecked;
    });
  }, []);

  const data: Column[] = useMemo(
    () =>
      BINGO.map((currentCharacter, columnIndex) => ({
        character: currentCharacter,
        numbers: generateNumbers(columnIndex),
      })),
    [generateNumbers]
  );

  return (
    <div className="bingo-card">
      {data.map((column, columnIndex) => (
        <div className="column" key={column.character}>
          <p className="cell header">{column.character}</p>
          {column.numbers.map((number, numberIndex) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <p
              className={`cell${
                numbersChecked.includes(number) ? ' checked' : ''
              }`}
              key={`${column.character}_${number}`}
              onClick={() =>
                columnIndex === 2 && numberIndex === 2
                  ? null
                  : handleOnNumberClick(number)
              }
            >
              {columnIndex === 2 && numberIndex === 2 ? 'FREE' : number}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BingoCard;
