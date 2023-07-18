import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyCAjliEeODXOHKdhAuOAK6-_jJ5iMkrHgY",
  authDomain: "solvechat-cdc39.firebaseapp.com",
  projectId: "solvechat-cdc39",
  storageBucket: "solvechat-cdc39.appspot.com",
  messagingSenderId: "911052446320",
  appId: "1:911052446320:web:1b41f017e36dbbd97c32b5",
  measurementId: "G-G5E3C68WRS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 4000);
  connectAuthEmulator(auth, "http://127.0.0.1:4000", { disableWarnings: true });
}
