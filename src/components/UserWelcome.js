/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import logo from "../images/logo.svg";

export const UserWelcome = ({ photo, userName, logout }) => {
  return (
    <div className="flex-container-welcome">
      <button onClick={logout} className="signout-button">
        Sign out
      </button>
      <div className="welcome-container">
        <h1 className="welcome-text">Welcome to play Bingo {userName}</h1>
        <img className="userPhoto" src={photo} alt="user photo" />
      </div>
      <img className="logo" src={logo} alt="positive impact" />
    </div>
  );
};
