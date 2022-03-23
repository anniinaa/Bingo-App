import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0Ez7X_JLQ8BwTXwX-2CRHpukfVAV3cQU",
  authDomain: "bingo-app-69fc2.firebaseapp.com",
  projectId: "bingo-app-69fc2",
  storageBucket: "bingo-app-69fc2.appspot.com",
  messagingSenderId: "1004790669446",
  appId: "1:1004790669446:web:4ddf93c4cbb505356a7107",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const authentication = getAuth(app);

export { db, authentication };
