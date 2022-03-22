import { useEffect, useState } from "react";
import { authentication } from "./firebase-confiq";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import shuffle from "shuffle-array";

import "./App.css";
import characters from "./bingoTableNames";

import { Bingo } from "./components/Bingo";
import { UserWelcome } from "./components/UserWelcome";

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const [bingoTableData, setBingoTableData] = useState({});
  // const [winnerRow, setwinnerRow] = useState([]);

  useEffect(() => {
    // if (user.accessToken) {
    //   const winnerRow = shuffle(characters).slice(0, 5);
    //   setwinnerRow(winnerRow);
    //   console.log("winnerRow", winnerRow);
    // }

    const data = shuffle(characters)
      .slice(0, 25)
      .reduce((data, value, index) => ({ ...data, [index]: value }), {});

    setBingoTableData(data);
  }, [user]); //RIITTÄÄKÖ TÄÄ AUTHENTICATION TÄHÄN????

  const signInWithGoogle = () => {
    signInWithPopup(authentication, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const logout = () => {
    setUser({});
  };

  return (
    <div>
      {!user.accessToken && (
        <div className="App-container">
          <h2 className="welcome">Welcome</h2>
          <button className="login-button" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
      )}
      {user.accessToken && (
        <div>
          <UserWelcome
            logout={logout}
            photo={user.photoURL}
            userName={user.displayName}
          />
          <Bingo bingoTableData={bingoTableData} user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
