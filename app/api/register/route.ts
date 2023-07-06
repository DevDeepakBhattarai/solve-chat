import { initializeFirebaseAdmin } from "@/lib/initializeFirebaseAdmin";
import { hash } from "bcryptjs";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
export async function POST(request: Request) {
  initializeFirebaseAdmin();
  try {
    const body = await request.json();
    const { email, password, userName } = body;

    if (!email && !password && !userName)
      return new Response("Invalid Credential", { status: 422 });
    const db = getFirestore();

    const isEmailAlreadyUsed = (
      await db.collection("users").where("email", "==", email).limit(1).get()
    ).docs[0]?.exists;
    if (isEmailAlreadyUsed)
      return new Response("Email Already Used", { status: 409 });

    const hashedPassword = await hash(password, 10);
    const userData = {
      email,
      name: userName,
    };
    const uid = crypto.randomUUID();
    await db.collection("users").doc(uid).set(userData);
    await db
      .collection("users")
      .doc(uid)
      .collection("password")
      .doc()
      .set({ hashedPassword });
    return new Response("Account Successfully created. You can now login!");
  } catch (e) {
    console.log(e);
    return new Error();
  }
}
