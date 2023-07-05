import NextAuth from "next-auth";
import {
  FirestoreAdapter,
  FirebaseAdapterConfig,
} from "@auth/firebase-adapter";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { cert } from "firebase-admin/app";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }) as Adapter,
});

export { handler as GET, handler as POST };
