import "./App.css";
import { authentication } from "./firebase-confiq";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { Bingo } from "./components/Bingo";
import { UserWelcome } from "./components/UserWelcome";

const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState({});

  const signInWithGoogle = () => {
    signInWithPopup(authentication, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log("user", user);
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
      {!user.email && (
        <div className="App-container">
          <h2 className="welcome">Welcome</h2>
          <button className="login-button" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
      )}
      {user.email && (
        <div>
          <UserWelcome
            logout={logout}
            photo={user.photoURL}
            userName={user.displayName}
          />
          <Bingo user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
