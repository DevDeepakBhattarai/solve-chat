import { initializeFirebaseAdmin } from "@/lib/initializeFirebaseAdmin";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
export async function POST(request: Request) {
  initializeFirebaseAdmin();
  try {
    const body = await request.json();

    const { email, password, userName } = body;

    const userCredential = await admin
      .auth()
      .createUser({ email, password, displayName: userName });

    const uid = userCredential.uid;
    const db = getFirestore();
    const userData = {
      email,
      userName,
    };
    await db.collection("users").doc(uid).set(userData);
    return new Response("Account Successfully created. You can now login !");
  } catch (e) {
    console.log(e);
    return new Error();
  }
}
