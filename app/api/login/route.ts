import { initializeFirebaseAdmin } from "@/lib/initializeFirebaseAdmin";
import { cookies } from "next/headers";
import * as admin from "firebase-admin";
export async function POST(request: Request) {
  initializeFirebaseAdmin();
  const idToken = request.headers.get("Authorization")?.split("Bearer")[1];
  console.log(idToken);
  try {
    if (!idToken) return new Error("Unauthorized");

    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedIdToken.uid)
      return new Response("Unauthorized", { status: 401 });

    const cookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn: 24 * 60 * 60 * 1000 });

    cookies().set("session", cookie, { httpOnly: true, secure: true });
    return new Response("Done");
  } catch (e) {
    console.log(e);
    return new Error("Something went wrong");
  }
}
