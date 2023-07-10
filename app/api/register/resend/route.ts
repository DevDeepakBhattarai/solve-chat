import { cookies } from "next/headers";
import { UserData } from "../route";
import { sign, verify } from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { Email } from "../Email";
import { render } from "@react-email/render";
import { hash } from "bcryptjs";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function POST() {
  const jwt = cookies().get("jwt")?.value;
  if (!jwt) return new Response("No json web token available", { status: 422 });

  const userData: UserData = verify(jwt, process.env.JWT_SECRET!) as UserData;
  if (!userData) return new Response("Invalid jwt", { status: 401 });

  if (userData?.time && userData.time > Date.now())
    return new Response("Please wait 1 minute before resending email", {
      status: 429,
    });

  const OTP = String(Math.floor(Math.random() * 1000000));
  const EmailHTML = render(Email({ opt: OTP }));

  const MailOptions = {
    from: `"SolveChat" <solvechat.help@gmail.com>`,
    to: userData.email,
    subject: "Confirmation Code",
    html: EmailHTML,
  };

  await transporter.sendMail(MailOptions).catch((err) => console.log(err));
  const hashedOTP = await hash(OTP, 10);
  const newUserData = {
    ...userData,
    OTP: hashedOTP,
    time: Date.now() + 60 * 1000,
  };

  const signedCredential = sign(userData, process.env.JWT_SECRET!);
  cookies().set("jwt", signedCredential);

  return new Response("OTP Successfully sent");
}
