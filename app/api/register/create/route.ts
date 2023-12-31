import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserData } from "../route";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getFirestore } from "firebase-admin/firestore";
export async function POST(request: Request) {
  const body = await request.json();
  const { OTP } = body;

  if (!OTP) return new Response("No OTP available", { status: 422 });
  const jwt = cookies().get("jwt")?.value;

  if (!jwt)
    return new Response("No any json web token available", { status: 422 });
  const userData = verify(jwt, process.env.JWT_SECRET!) as UserData;

  if (!userData) return new Response("Invalid jwt", { status: 422 });

  if (userData.used > 5)
    return new Response(
      "You have tried too many times .Please start over again",
      {
        status: 410,
      }
    );

  const isOTPCorrect = await compare(OTP, userData.OTP);

  if (!isOTPCorrect) {
    const newJWT = sign(
      { ...userData, used: userData.used + 1 },
      process.env.JWT_SECRET!
    );
    cookies().delete("jwt");
    cookies().set("jwt", newJWT);
    return new Response("Invalid OTP please try again", { status: 400 });
  }

  const userDataToPutInDB = {
    name: userData.name,
    email: userData.email,
  };
  try {
    const db = getFirestore();
    const uid = crypto.randomUUID();
    await db.collection("users").doc(uid).set(userDataToPutInDB);
    await db
      .collection("users")
      .doc(uid)
      .collection("password")
      .doc()
      .set({ hashedPassword: userData.password });
    cookies().delete("jwt");
    return new Response("Account Successfully created. You can now login!");
  } catch (e) {
    console.log(e);
    return new Error();
  }
}
