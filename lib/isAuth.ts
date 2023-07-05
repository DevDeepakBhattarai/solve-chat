import * as firebase from "firebase-admin";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function isAuth(request: NextRequest) {
  const cookie = request.cookies.get("session");
  const isAuth = await firebase.auth().verifySessionCookie(cookie?.value || "");

  if (isAuth.uid) {
    return true;
  }

  return false;
}
