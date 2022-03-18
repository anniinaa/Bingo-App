import React, { useState } from "react";

import characters from "../bingoNumbers";
import shuffle from "shuffle-array";

export const Bingo = ({ user }) => {
  const [checked, setChecked] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [random, setRandom] = useState("");

  const data = shuffle(characters)
    .slice(0, 25)
    .reduce((data, value, index) => ({ ...data, [index]: value }), {});

  console.log("data", data);

  const randomCharacter = () => {
    let random = characters[Math.floor(Math.random() * characters.length)];
    setRandom(random);
  };

  const selectedButton = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "rgba(16, 94, 26, 0.219)";
  };

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
        {Object.keys(data).map((id) => (
          <button
            className="bingo-button"
            key={id}
            id={id}
            onClick={selectedButton}
            disabled={disabled}
          >
            {data[id]}
          </button>
        ))}
      </div>
    </div>
  );
};
