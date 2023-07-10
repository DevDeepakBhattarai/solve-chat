import AutoSignIn from "@/components/Authentication/AutoSignIn";
import Toaster from "@/components/ui/toaster";
import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SolveChat",
  description: "A chat app created by Deepak Bhattarai",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Toaster></Toaster>
        {children}
        {session && <AutoSignIn />}
      </body>
    </html>
  );
}
