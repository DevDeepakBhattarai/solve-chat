import React, { ReactElement, useState } from "react";
import Input, { PasswordInput } from "./Input";
import MailIcon from "../Icons/MailIcon";
import LockIcon from "../Icons/LockIcon";
import UserIcon from "../Icons/UserIcon";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthState } from "@/states/authState";
interface Props {}

export default function RegisterForm({}: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { setActiveTab, isLoading, setIsLoading } = useAuthState();
  const [error, setError] = useState<number[]>([0, 0, 0, 0]);
  return (
    <div className="px-4 md:px-16 py-10 grid mx-auto gap-8 max-w-2xl ">
      <p>
        If you already have a account you can{" "}
        <span
          className="text-primary underline cursor-pointer font-semibold"
          onClick={() => {
            setActiveTab("signin");
          }}
        >
          login here!
        </span>{" "}
      </p>

      <div className="space-y-6 text-primary">
        <Input
          value={email}
          setValue={setEmail}
          label="Email"
          type="email"
          placeholder="Enter your email address"
          Icon={<MailIcon></MailIcon>}
          error={Boolean(error[0])}
          onFocus={() => updateError(0)}
        ></Input>
        <Input
          value={userName}
          setValue={setUserName}
          label="Username"
          type="text"
          placeholder="Enter your fullname"
          Icon={<UserIcon></UserIcon>}
          onFocus={() => updateError(1)}
          error={Boolean(error[1])}
        ></Input>

        <PasswordInput
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Enter your password"
          type="password"
          onFocus={() => updateError(2)}
          Icon={<LockIcon></LockIcon>}
          error={Boolean(error[2])}
        />
        <PasswordInput
          value={confirmPassword}
          setValue={setConfirmPassword}
          label="Confirm Password"
          placeholder="Confirm Your password"
          type="password"
          onFocus={() => updateError(3)}
          Icon={<LockIcon></LockIcon>}
          error={Boolean(error[3])}
        />
      </div>

      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="py-4 w-[90%] rounded-full active:scale-95 transition-all duration-150 font-semibold dark:text-white dark:hover:bg-primary/70"
        >
          Register
        </Button>
      </div>
    </div>
  );

  function updateError(index: number) {
    setError((prev) => {
      prev[index] = 0;
      return [...prev];
    });
  }
  async function handleSubmit() {
    const isRequestAllowed = handleError();
    if (!isRequestAllowed) return;
    try {
      setIsLoading(true);
      const res = await axios.post(
        "/api/register",
        { email, password, userName },
        { withCredentials: true }
      );
      const data = res.data;
      toast.success(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleError(): boolean {
    if (
      email.trim() == "" ||
      userName.trim() == "" ||
      password.trim() == "" ||
      confirmPassword.trim() == ""
    ) {
      setError([
        Number(email == ""),
        Number(userName == ""),
        Number(password == ""),
        Number(confirmPassword == ""),
      ]);
      toast.error("Please Enter all the credential");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email");
      setError([1, 0, 0, 0]);
      return false;
    }

    if (confirmPassword !== password) {
      setError([0, 0, 1, 1]);
      toast.error("Your password do not match");
      return false;
    }

    return true;
  }
}
