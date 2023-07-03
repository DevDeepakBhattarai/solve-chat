import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAE8V0GbAb33MzvXc2SnBJQ7cn84P5GUEo",
  authDomain: "facebook-clone-8fca4.firebaseapp.com",
  databaseURL:
    "https://facebook-clone-8fca4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "facebook-clone-8fca4",
  storageBucket: "facebook-clone-8fca4.appspot.com",
  messagingSenderId: "460358990293",
  appId: "1:460358990293:web:8d3737ccfa74915854e55c",
  measurementId: "G-8LGC1BPE07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const googleProvider = new GoogleAuthProvider();
