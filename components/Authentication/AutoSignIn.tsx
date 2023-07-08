"use client";
import { auth } from "@/lib/firebase";
import {
  Unsubscribe,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from "firebase/auth";
import { SessionProvider, useSession } from "next-auth/react";
import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import { toast } from "react-toastify";

interface Props {}

function Form({}: Props): ReactElement {
  const { data: session } = useSession();
  const unsubscribe: MutableRefObject<Unsubscribe | null> = useRef(null);
  useEffect(() => {
    async function Login() {
      if (session?.user.customToken) {
        try {
          unsubscribe.current = onAuthStateChanged(auth, async (user) => {
            if (!user)
              await signInWithCustomToken(auth, session.user.customToken);
          });
        } catch (e) {
          toast.error("Something went wrong.");
        }

        if (!session) {
          signOut(auth);
        }
      }
    }

    Login();
    return () => {
      unsubscribe.current && unsubscribe.current();
    };
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
