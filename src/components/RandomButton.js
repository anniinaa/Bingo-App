import React from "react";

export const RandomButton = ({
  random,
  randomCharacter,
  resetGame,
  hasWon,
}) => {
  return (
    <div className="random-container">
      {!random ? (
        <button
          disabled={hasWon}
          className="randombuttom-start"
          onClick={() => randomCharacter()}
        >
          start game
        </button>
      ) : (
        <button
          disabled={hasWon}
          className="randombuttom-next"
          onClick={() => randomCharacter()}
        >
          next character
        </button>
      )}
      <h4 className="random-character">{random}</h4>
      <div className="reset-button-container">
        {random || hasWon ? (
          <button className="reset-button" onClick={resetGame}>
            reset game
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
