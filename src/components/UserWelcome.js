/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

export const UserWelcome = ({ photo, userName }) => {
  return (
    <div>
      <h1 className="welcome-text">Welcome to play Bingo {userName}</h1>
      <img src={photo} alt="user photo" />
    </div>
  );
};
