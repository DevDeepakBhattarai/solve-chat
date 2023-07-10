"use client";
import axios from "axios";
import React, { ReactElement, useState } from "react";
import PinInput from "react-pin-input";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  email: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OTPModal({
  open = false,
  email,
  setOpen,
}: Props): ReactElement {
  const [OTP, setOTP] = useState<string | null>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className=" max-w-lg">
        <DialogHeader>
          <DialogTitle>Verify you email</DialogTitle>
          <DialogDescription>
            We have sent a code to your email {hideEmail(email)}
          </DialogDescription>
          <DialogDescription>
            Please enter the code below to create your account
          </DialogDescription>
        </DialogHeader>
        <div
          onFocusCapture={() => setError(false)}
          className="grid place-items-center"
        >
          <PinInput
            type="numeric"
            onChange={(value) => setOTP(value)}
            length={6}
            initialValue=""
            onComplete={(value) => setOTP(value)}
            secret={false}
            inputMode="number"
            style={{ padding: "10px" }}
            inputStyle={{
              borderColor: error ? "red" : "white",
              borderRadius: "0.175rem",
            }}
            autoSelect={true}
          />
        </div>
        <div className="text-center space-y-2">
          <Button
            className={cn(
              "w-5/6 active:scale-95 transition-all duration-150  space-x-4 font-semibold text-white",
              error ? "animate-shake" : "animate-none"
            )}
            onClick={createAccount}
            loading={isLoading}
            disabled={isLoading}
          >
            Create account
          </Button>

          <div className="block">
            Didn&apos;t receive a code ?{" "}
            <button
              disabled={isLoading}
              className="font-bold text-primary disabled:scale-95 disabled:text-primary/80"
              onClick={resend}
            >
              Resend
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
  async function resend() {
    try {
      setIsLoading(true);
      await axios.post("/api/register/resend", {}, { withCredentials: true });
      toast.success("Successfully sent!");
    } catch (e: any) {
      toast.error(e.response.data);
    } finally {
      setIsLoading(false);
    }
  }
  async function createAccount() {
    if (!OTP) {
      setError(true);
      return toast.error("Please enter the otp");
    }
    try {
      setIsLoading(true);
      await axios.post(
        "/api/register/create",
        { OTP },
        { withCredentials: true }
      );
      toast.success("Account Successfully Created. You can now login");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }
}

function hideEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return email;
  }

  const firstPart = email.substring(0, 1);
  const secondPart = email.substring(1, atIndex - 1);
  const thirdPart = email.substring(atIndex - 1);
  const hiddenPart = secondPart.replace(/[a-zA-Z0-9]/g, "*");

  return firstPart + hiddenPart + thirdPart;
}
