"use client";
import { cn } from "@/lib/utils";
import { useAuthState } from "@/states/authState";
import { signIn } from "next-auth/react";
import { ReactElement, useState } from "react";
import { toast } from "react-toastify";
import GoogleIcon from "../Icons/GoogleIcon";
import LockIcon from "../Icons/LockIcon";
import MailIcon from "../Icons/MailIcon";
import { Button } from "../ui/button";
import Input, { PasswordInput } from "./Input";
interface Props {}
export default function LoginForm({}: Props): ReactElement {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState([0, 0]);

  const { setActiveTab, isLoading, setIsLoading } = useAuthState();
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
          error={Boolean(error[0])}
          onFocus={() =>
            setError((prev) => {
              prev[0] = 0;
              return [...prev];
            })
          }
        ></Input>

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
          error={Boolean(error[1])}
          onFocus={() =>
            setError((prev) => {
              prev[1] = 0;
              return [...prev];
            })
          }
          Icon={<LockIcon />}
        ></PasswordInput>
      </div>

      <div className={"text-center "}>
        <Button
          onClick={emailAndPasswordLogin}
          disabled={isLoading}
          loading={isLoading}
          className={cn(
            "py-4 w-[90%] rounded-full active:scale-95 transition-all duration-150 font-semibold dark:text-white dark:hover:bg-primary/70",
            error.includes(1) ? " animate-shake" : "animate-none"
          )}
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
          onClick={async () => {
            const data = await signIn("google");
            if (data?.error) {
              toast.error("Something went wrong. Please try again");
            }
          }}
          className="text-white whitespace-nowrap bg-blue-600 hover:bg-blue-600/90  flex items-center justify-center gap-2 transition-all rounded-full duration-150 cursor-pointer px-1 h-9 pr-2 hover:scale-105"
        >
          <span className="bg-white rounded-full">
            <GoogleIcon className="h-8 w-8"></GoogleIcon>
          </span>

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
    if (email.trim() === "" || password.trim() === "") {
      setError([Number(email.trim() == ""), Number(password.trim() === "")]);
      toast.error("Please enter your email and password");

      return;
    }
    setIsLoading(true);
    const data = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (data?.error) {
      toast.error("Your Credentials do not match. Please try again");
    }
    setIsLoading(false);
  }
}
