import { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { cert } from "firebase-admin/app";
import { initializeFirebaseAdmin } from "@/lib/initializeFirebaseAdmin";
import * as admin from "firebase-admin";
import { compare } from "bcryptjs";

interface User {
  id: string;
  name: string;
  password: string;
  email: string;
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credential",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credential, req) {
        initializeFirebaseAdmin();
        //! Get the info of the user form the users collection
        const snap = await admin
          .firestore()
          .collection("users")
          .where("email", "==", credential?.email)
          .limit(1)
          .get();
        let userData: User | undefined;

        snap.forEach((doc) => {
          userData = { id: doc.id, ...doc.data() } as User;
        });

        if (!userData) return null;

        //! Get the password from the private /users/{userId}/password collection
        const passwordSnapshot = await admin
          .firestore()
          .collection("users")
          .doc(userData.id)
          .collection("password")
          .get();
        const { hashedPassword } = passwordSnapshot.docs[0].data();

        const isPasswordValid = await compare(
          credential?.password as string,
          hashedPassword
        );

        if (!isPasswordValid) return null;
        const { password, ...user } = userData;
        return user;
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }) as Adapter,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    session({ session, token }) {
      session.user.id = token.id;
      session.user.customToken = token.customToken;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const firebaseCustomToken = await admin
          .auth()
          .createCustomToken(user.id);
        token.customToken = firebaseCustomToken;
        token.id = user.id;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NO_SECRET,
};
