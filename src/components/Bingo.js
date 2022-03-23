import React, { useState } from "react";

import characters from "../bingoTableNames";

import { RandomButton } from "./RandomButton";
import { SelectedCharacters } from "./SelectedCharacters";

const newRandom = (currentRandomArray, allCharacters) => {
  const array = allCharacters.filter((x) => !currentRandomArray.includes(x));
  const random = array[Math.floor(Math.random() * array.length)];

  return random;
};

export const Bingo = ({ bingoTableData, mapDataToTable, wins, setWins }) => {
  const [random, setRandom] = useState("");
  const [randomArray, setRandomArray] = useState([]);
  const [data, setData] = useState(bingoTableData);
  const [hasWon, setHasWon] = useState(false);
  const [winCount, setWincount] = useState(0);

  const arrayContainsElements = (arrays, filteredArray) => {
    const results = arrays.map((x) =>
      x.every((x) => filteredArray.map((x) => x.index).includes(x))
    );

    if (results.includes(true)) {
      return true;
    }
    return false;
  };

  const checkIfWon = (dataArray) => {
    const array1 = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];
    const filteredArray = dataArray.filter((x) => x.selected);

    const playerWon = arrayContainsElements(array1, filteredArray);
    return playerWon;
  };

  const randomCharacter = () => {
    if (randomArray.length >= characters.length) {
      return;
    }
    const random = newRandom(randomArray, characters);

    setRandom(random);
    setRandomArray((oldArr) => [...oldArr, random]);
  };

  const selectedButton = (i) => {
    const current = data.find((x) => x.index === i);

    const filtered = data.filter((x) => x.index !== i);

    current.selected = !current.selected;

    setData([...filtered, current]);

    if (checkIfWon([...filtered, current]) === true) {
      setHasWon(true);
      setWincount(winCount + 1);
    }
  };

  const resetGame = () => {
    setRandomArray([]);

    const newData = mapDataToTable(characters);
    setData(newData);
    setRandom("");
    setHasWon(false);
  };

  return (
    <div className="bingo-container">
      <RandomButton
        random={random}
        randomCharacter={randomCharacter}
        resetGame={resetGame}
        hasWon={hasWon}
      />
      {hasWon ? (
        <h3 className="haswon-header">
          Congratulations! Please reset the game.{" "}
        </h3>
      ) : (
        <>
          <div className="bingo-wrapper">
            {data
              ?.sort((a, b) => (a.index < b.index ? -1 : 1))
              .map((char) => (
                <button
                  className="bingo-button"
                  key={char.index}
                  id={char.index}
                  onClick={() => selectedButton(char.index)}
                  disabled={hasWon}
                  value={char.name}
                  style={
                    !char.selected
                      ? { backgroundColor: "rgb(84, 75, 109)" }
                      : { backgroundColor: "rgba(16, 94, 26, 0.219)" }
                  }
                >
                  {char.name}
                </button>
              ))}
          </div>
          <h2 className="wons-heading">Previous wins: {winCount}</h2>
          {random ? (
            <h2 className="characters-heading">Character list: </h2>
          ) : null}
          <SelectedCharacters randomArray={randomArray} />
        </>
      )}
    </div>
  );
};
