/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

export const SelectedCharacters = ({ randomArray }) => {
  return (
    <div className="char-list">
      {randomArray.map((char, index) => (
        <li key={index} className="char-item">
          {char} /
        </li>
      ))}
    </div>
  );
};
