"use client";
import { auth } from "@/lib/firebase";
import { signInWithCustomToken, signOut } from "firebase/auth";
import { SessionProvider, getSession, useSession } from "next-auth/react";
import React, { ReactElement, use, useEffect } from "react";
import { toast } from "react-toastify";

interface Props {}

function Form({}: Props): ReactElement {
  const { data: session } = useSession();
  useEffect(() => {
    async function Login() {
      if (session?.user.customToken) {
        try {
          await signInWithCustomToken(auth, session.user.customToken);
        } catch (e) {
          toast.error("Something went wrong.", {
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

        if (!session) {
          signOut(auth);
        }
      }
    }

    Login();
  }, [session]);
  return <></>;
}
export default function AutoSignIn() {
  return (
    <SessionProvider>
      <Form></Form>
    </SessionProvider>
  );
}
