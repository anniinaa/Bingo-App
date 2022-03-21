import React, { useState } from "react";

import characters from "../bingoTableNames";

export const Bingo = ({ winnerRow, bingoTableData }) => {
  const [checked, setChecked] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [random, setRandom] = useState("");

  const [randomArray, setRandomArray] = useState([]);

  const randomCharacter = () => {
    let random = characters[Math.floor(Math.random() * characters.length)];
    setRandom(random);
    setRandomArray((oldArray) => [...oldArray, random]);
  };

  const selectedButton = (e) => {
    e.preventDefault();
    setChecked((oldArr) => [...oldArr, e.target.value]);
    e.target.style.backgroundColor = "rgba(16, 94, 26, 0.219)";
  };

  console.log("randomArray", randomArray);
  console.log("checked", checked);

  return (
    <div className="bingo-container">
      <div className="random-container">
        {!random ? (
          <button
            className="randombuttom-start"
            onClick={() => randomCharacter()}
          >
            start game
          </button>
        ) : (
          <button
            className="randombuttom-next"
            onClick={() => randomCharacter()}
          >
            next character
          </button>
        )}
        <h4 className="random-character">{random}</h4>
      </div>
      <div className="bingo-wrapper">
        {Object.keys(bingoTableData).map((id) => (
          <button
            className="bingo-button"
            key={id}
            id={id}
            onClick={selectedButton}
            disabled={disabled}
            value={bingoTableData[id]}
          >
            {bingoTableData[id]}
          </button>
        ))}
      </div>
      {random ? <h2 className="characters-heading">Character list: </h2> : null}
      <div className="char-list">
        {randomArray.map((char) => (
          <li className="char-item">{char} /</li>
        ))}
      </div>
    </div>
  );
};
