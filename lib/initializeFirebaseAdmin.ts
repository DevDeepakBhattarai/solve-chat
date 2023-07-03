import * as firebase from "firebase-admin";
import secret from "../secret.json";
export function initializeFirebaseAdmin() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert(secret as firebase.ServiceAccount),
    });
  }
}
