import { getServerSession } from "next-auth";
import "./globals.css";
import { Inter } from "next/font/google";
import { nextAuthOptions } from "@/lib/nextAuthConfig";
import AutoSignIn from "@/components/Authentication/AutoSignIn";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat App",
  description: "A chat app created by Deepak Bhattarai",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(nextAuthOptions);
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
      {/* {session && <AutoSignIn />} */}
    </html>
  );
}
