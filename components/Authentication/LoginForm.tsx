"use client";
import React, { ReactElement, forwardRef, useState } from "react";
import Logo from "../Logo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setActiveTab } from "@/slices/AuthSlice";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import MailIcon from "../Icons/MailIcon";
import AppleIcon from "../Icons/AppleIcon";
import GoogleIcon from "../Icons/GoogleIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import Input, { PasswordInput } from "./Input";
import LockIcon from "../Icons/LockIcon";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  appleProvider,
  auth,
  db,
  facebookProvider,
  googleProvider,
} from "@/lib/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
interface Props {}

export default function LoginForm({}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="px-16 py-10 grid mx-auto gap-8 max-w-2xl ">
      <p>
        If you don&apos;t have a account you can{" "}
        <span
          className="text-primary underline cursor-pointer font-semibold"
          onClick={() => {
            dispatch(setActiveTab("signup"));
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
        or continue with
      </div>

      <div className="flex gap-2 justify-center  hover:">
        {/*//! Apple Logo */}
        <Button
          onClick={() => signWithProvider(appleProvider)}
          className="h-10 w-10 rounded-full bg-white dark:p-2  hover:scale-110 transition-all duration-150 p-0 cursor-pointer hover:bg-white"
        >
          <AppleIcon></AppleIcon>
        </Button>
        {/* //! Googlge Logo */}
        <Button
          onClick={() => signWithProvider(googleProvider)}
          className="h-10 w-10 hover:scale-110 transition-all bg-transparent rounded-full duration-150 cursor-pointer p-0 hover:bg-background"
        >
          <GoogleIcon></GoogleIcon>
        </Button>{" "}
        {/* //! Facebook Logo */}
        <Button
          onClick={() => signWithProvider(facebookProvider)}
          className="h-11 w-11 hover:scale-110 transition-all  bg-transparent rounded-full   duration-150 cursor-pointer p-0 hover:bg-background"
        >
          <FacebookIcon></FacebookIcon>
        </Button>
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
      await handleServerLogic(idToken);
      const userCollection = collection(db, "users");
      const userData = {
        userName: userCredential.user.displayName || "",
        email: userCredential.user.email || "",
        photo: userCredential.user.photoURL || "",
      };
      const uid = userCredential.user.uid;
      await setDoc(doc(db, "users", uid), userData);
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
    const res = await axios.post(
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
