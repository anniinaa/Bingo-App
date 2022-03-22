import React, { useState } from "react";
import shuffle from "shuffle-array";

import characters from "../bingoTableNames";
import { RandomButton } from "./RandomButton";
import { SelectedCharacters } from "./SelectedCharacters";

export const Bingo = ({ bingoTableData }) => {
  const [checked, setChecked] = useState([]);
  const [random, setRandom] = useState("");
  const [randomArray, setRandomArray] = useState([]);
  const [data, setData] = useState(bingoTableData);

  const [hasWon, setHasWon] = useState(false);

  const randomCharacter = () => {
    let random = characters[Math.floor(Math.random() * characters.length)];
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

  // disable button kun klikattu? tallentaa saman nimen kokoajan udestaan array
  // vahingossa klikattu saa myös poistettua arraysta

  //  TULEE SAMAT NIMET RANDOM NAPISTA ?

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
