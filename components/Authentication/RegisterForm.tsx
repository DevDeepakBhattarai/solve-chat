import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setActiveTab } from "@/slices/AuthSlice";
import Input, { PasswordInput } from "./Input";
import MailIcon from "../Icons/MailIcon";
import LockIcon from "../Icons/LockIcon";
import UserIcon from "../Icons/UserIcon";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
interface Props {}

export default function RegisterForm({}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="px-16 py-10 grid mx-auto gap-8 max-w-2xl ">
      <p>
        If you already have a account you can{" "}
        <span
          className="text-primary underline cursor-pointer font-semibold"
          onClick={() => {
            dispatch(setActiveTab("signin"));
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
        ></Input>
        <Input
          value={userName}
          setValue={setUserName}
          label="Username"
          type="text"
          placeholder="Enter your fullname"
          Icon={<UserIcon></UserIcon>}
        ></Input>

        <PasswordInput
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Enter your password"
          type="email"
          Icon={<LockIcon></LockIcon>}
        />
        <PasswordInput
          value={confirmPassword}
          setValue={setConfirmPassword}
          label="Confirm Password"
          placeholder="Confirm Your password"
          type="email"
          Icon={<LockIcon></LockIcon>}
        />
      </div>

      <div className="text-center">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="py-4 w-[90%] rounded-full active:scale-95 transition-all duration-150 font-semibold dark:text-white dark:hover:bg-primary/70"
        >
          Register
        </Button>
      </div>
    </div>
  );
  async function handleSubmit() {
    if (password !== confirmPassword) {
      toast.error("Your password do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/register",
        { email, password, userName },
        { withCredentials: true }
      );
      const data = res.data;
      toast.success(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e: any) {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }
}
