"use client";
import { auth } from "@/lib/firebase";
import { useUser } from "@/states/userState";
import {
  Unsubscribe,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from "firebase/auth";
import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { MutableRefObject, ReactElement, useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface Props {
  session: Session | null;
}

function Form({ session }: Props): ReactElement {
  const unsubscribe: MutableRefObject<Unsubscribe | null> = useRef(null);
  const { setUser, setLoading } = useUser();
  useEffect(() => {
    if (session?.user) {
      setUser({
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      });
      setLoading(false);
    }

    async function Login() {
      if (session?.user.customToken) {
        unsubscribe.current = onAuthStateChanged(auth, async (user) => {
          console.log(user);
          if (user) return;

          try {
            await signInWithCustomToken(auth, session.user.customToken);
          } catch (e) {
            console.log(e);
          }
        });
      }
    }

    if (!session) {
      signOut(auth);
    }

    Login();
    return () => {
      unsubscribe.current && unsubscribe.current();
    };
  }, [session, setLoading, setUser]);
  return <></>;
}
export default function AutoSignIn({ session }: Props) {
  return (
    <SessionProvider>
      <Form session={session}></Form>
    </SessionProvider>
  );
}
