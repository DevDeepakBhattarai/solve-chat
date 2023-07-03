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
interface Props {}

export default function LoginForm({}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
        <Button className="py-4 w-[90%] rounded-full active:scale-95 transition-all duration-150 font-semibold dark:text-white dark:hover:bg-primary/70">
          Login
        </Button>
      </div>

      <div className="text-center text-gray-800/60 font-bold text-sm dark:text-white/75">
        or continue with
      </div>

      <div className="flex gap-2 justify-center  hover:">
        {/*//! Apple Logo */}
        <div className="h-10 w-10 rounded-full bg-white dark:p-2  hover:scale-110 transition-all duration-150 cursor-pointer">
          <AppleIcon></AppleIcon>
        </div>
        {/* //! Googlge Logo */}
        <div className="h-10 w-10 hover:scale-110 transition-all duration-150 cursor-pointer">
          <GoogleIcon></GoogleIcon>
        </div>{" "}
        {/* //! Facebook Logo */}
        <div className="h-11 w-11 hover:scale-110 transition-all duration-150 cursor-pointer">
          <FacebookIcon></FacebookIcon>
        </div>
      </div>
    </div>
  );
}
