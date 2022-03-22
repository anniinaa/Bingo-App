import React, { useState } from "react";
import shuffle from "shuffle-array";

import characters from "../bingoTableNames";
import { RandomButton } from "./RandomButton";
import { SelectedCharacters } from "./SelectedCharacters";

const newRandom = (currentRandomArray, allCharacters) => {
  const array = allCharacters.filter((x) => !currentRandomArray.includes(x));
  const random = array[Math.floor(Math.random() * array.length)];

  return random;
};

export const Bingo = ({ bingoTableData }) => {
  const [checked, setChecked] = useState([]);
  const [random, setRandom] = useState("");
  const [randomArray, setRandomArray] = useState([]);
  const [data, setData] = useState(bingoTableData);
  const [hasWon, setHasWon] = useState(false);

  const randomCharacter = () => {
    if (randomArray.length >= characters.length) {
      return;
    }
    const random = newRandom(randomArray, characters);

    setRandom(random);
    setRandomArray((oldArr) => [...oldArr, random]);
  };

  const selectedButton = (e) => {
    e.preventDefault();

    if (e.target.value !== checked.value) {
      setChecked((oldArr) => [...oldArr, e.target.value]);
      e.target.style.backgroundColor = "rgba(16, 94, 26, 0.219)";
    }
  };

  const resetGame = () => {
    const newData = shuffle(characters).slice(0, 25);

    setData(newData);
    setRandomArray([]);
    setChecked([]);
    setRandom("");
    setHasWon(false);
  };

  console.log("randomArray", randomArray);
  console.log("checked", checked);

  const WinnerLineCount = () => {};

  // disable button kun klikattu? tallentaa saman nimen kokoajan udestaan array
  // vahingossa klikattu saa myös poistettua arraysta

  // voittologiikka 5 rivissä
  // voitto kertojen tallennus firestoreen

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
        <div className="bingo-wrapper">
          {data.map((char, id) => (
            <button
              className="bingo-button"
              key={id}
              id={id}
              onClick={selectedButton}
              disabled={hasWon || !random}
              value={char}
              style={!random ? { backgroundColor: "rgb(84, 75, 109)" } : {}}
            >
              {char}
            </button>
          ))}
        </div>
      )}
      {random ? <h2 className="characters-heading">Character list: </h2> : null}
      <SelectedCharacters randomArray={randomArray} />
    </div>
  );
};
