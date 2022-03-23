import { useEffect, useState } from "react";
import { db, authentication } from "./firebase/firebase-confiq";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import shuffle from "shuffle-array";

import "./App.css";
import characters from "./bingoTableNames";

import { Bingo } from "./components/Bingo";
import { UserWelcome } from "./components/UserWelcome";

const provider = new GoogleAuthProvider();

const mapDataToTable = (allCharacters) => {
  const data = shuffle(allCharacters).slice(0, 25);

  const tableData = data.map((x, i) => ({
    name: x,
    index: i,
    selected: false,
  }));
  return tableData;
};

function App() {
  const [user, setUser] = useState({});
  const [bingoTableData, setBingoTableData] = useState([]);
  const [wins, setWins] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "UserInfo"), (snapshot) =>
      setWins(snapshot.docs.map((doc) => doc.data()))
    );

    // fetch the right data with wins[0].wins

    const data = mapDataToTable(characters);
    setBingoTableData(data);
  }, [user]);

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
          <Bingo
            mapDataToTable={mapDataToTable}
            bingoTableData={bingoTableData}
            user={user}
          />
        </div>
      )}
    </div>
  );
}

export default App;
