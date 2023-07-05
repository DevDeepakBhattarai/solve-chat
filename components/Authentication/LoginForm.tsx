"use client";
import {
  appleProvider,
  auth,
  db,
  facebookProvider,
  googleProvider,
} from "@/lib/firebase";
import axios from "axios";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import GoogleIcon from "../Icons/GoogleIcon";
import LockIcon from "../Icons/LockIcon";
import MailIcon from "../Icons/MailIcon";
import { Button } from "../ui/button";
import Input, { PasswordInput } from "./Input";
import { useAuthState } from "@/states/authState";
interface Props {}

export default function LoginForm({}: Props): ReactElement {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { setActiveTab } = useAuthState();
  return (
    <div className="px-4 md:px-16 py-10 grid mx-auto gap-8 max-w-2xl ">
      <p>
        If you don&apos;t have a account you can{" "}
        <span
          className="text-primary underline cursor-pointer font-semibold"
          onClick={() => {
            setActiveTab("signup");
          }}
        >
          register here!
        </span>{" "}
      </p>

      <div className="space-y-6 text-primary">
        <Input
          label="Email"
          setValue={setEmail}
          value={email}
          placeholder="Enter your email here"
          type="email"
          Icon={<MailIcon></MailIcon>}
        ></Input>

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
          Icon={<LockIcon />}
        ></PasswordInput>
      </div>

      <div className="text-center">
        <Button
          onClick={emailAndPasswordLogin}
          disabled={loading}
          className="py-4 w-[90%] rounded-full active:scale-95 transition-all duration-150 font-semibold dark:text-white dark:hover:bg-primary/70"
        >
          Login
        </Button>
      </div>

      <div className="text-center text-gray-800/60 font-bold text-sm dark:text-white/75">
        or
      </div>

      <div className="flex gap-2 justify-center  hover:">
        {/*//! Apple Logo */}
        {/* <Button
          onClick={() => signWithProvider(appleProvider)}
          className="h-10 w-10 rounded-full bg-white dark:p-2  hover:scale-110 transition-all duration-150 p-0 cursor-pointer hover:bg-white"
        >
          <AppleIcon></AppleIcon>
        </Button> */}
        {/* //! Googlge Logo */}
        <Button
          onClick={() => signWithProvider(googleProvider)}
          className="text-black whitespace-nowrap bg-white hover:bg-white/90  flex items-center justify-center gap-3 transition-all rounded-md duration-150 cursor-pointer p-2 hover:scale-105"
        >
          <GoogleIcon></GoogleIcon>

          <span className="font-semibold">Continue with Google</span>
        </Button>{" "}
        {/* //! Facebook Logo */}
        {/* <Button
          onClick={() => signWithProvider(facebookProvider)}
          className="h-11 w-11 hover:scale-110 transition-all  bg-transparent rounded-full   duration-150 cursor-pointer p-0 hover:bg-background"
        >
          <FacebookIcon></FacebookIcon>
        </Button> */}
      </div>
    </div>
  );

  async function emailAndPasswordLogin() {
    setLoading(true);
    console.log(email, password);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      await handleServerLogic(idToken);
    } catch (e) {
      setLoading(false);

      toast.error("Email and password do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  async function signWithProvider(provider: any) {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      //! Send a request to the server to handle ssr later on
      await handleServerLogic(idToken);

      const userData = {
        userName: userCredential.user.displayName || "",
        email: userCredential.user.email || "",
        photo: userCredential.user.photoURL || "",
      };

      const uid = userCredential.user.uid;
      const docRef = doc(db, "users", uid);
      const userDoc = await getDoc(docRef);

      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", uid), userData); //* Create doc if it does not exits
      }
    } catch (e: any) {
      console.log(e.code);
      if (e.code !== "auth/cancelled-popup-request")
        toast.error("Something went wrong please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    }
  }

  async function handleServerLogic(idToken: string) {
    await axios.post(
      "/api/login",
      {},
      {
        headers: {
          Authorization: "Bearer" + idToken,
        },
        withCredentials: true,
      }
    );
    setLoading(false);
  }
}
