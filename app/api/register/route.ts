import { initializeFirebaseAdmin } from "@/lib/initializeFirebaseAdmin";
import { render } from "@react-email/render";
import { hash } from "bcryptjs";
import { getFirestore } from "firebase-admin/firestore";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { createTransport } from "nodemailer";
import { Email } from "./Email";
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
export interface UserData {
  name: string;
  password: string;
  OTP: string;
  email: string;
  used: number;
  time?: number;
}
export async function POST(request: Request) {
  initializeFirebaseAdmin();
  try {
    const body = await request.json();
    const { email, password, userName } = body;

    if (email.trim() == "" || password.trim() == "" || userName.trim() == "")
      return new Response("Invalid Credential", { status: 422 });
    const db = getFirestore();

    const isEmailAlreadyUsed = (
      await db.collection("users").where("email", "==", email).limit(1).get()
    ).docs[0]?.exists;

    if (isEmailAlreadyUsed)
      return new Response("Email Already Used", { status: 409 });

    const OTP = String(Math.floor(Math.random() * 1000000));
    const EmailHTML = render(Email({ opt: OTP }));
    const MailOptions = {
      from: `"SolveChat" <solvechat.help@gmail.com>`,
      to: email,
      subject: "Confirmation Code",
      html: EmailHTML,
    };
    await transporter.sendMail(MailOptions).catch((err) => console.log(err));
    const hashedOTP = await hash(OTP, 10);
    const hashedPassword = await hash(password, 10);

    const userData: UserData = {
      email,
      password: hashedPassword,
      name: userName,
      OTP: hashedOTP,
      used: 0,
    };

    const signedCredential = sign(userData, process.env.JWT_SECRET!);
    cookies().set("jwt", signedCredential);

    return new Response("OTP Successfully sent");
  } catch (e) {
    console.log(e);
    return new Error();
  }
}
