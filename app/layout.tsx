import AutoSignIn from "@/components/Authentication/AutoSignIn";
import Toaster from "@/components/ui/toaster";
import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Sidebar/Navbar";

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
        {session && <Navbar></Navbar>}
        <Toaster></Toaster>
        {children}
        {session && <AutoSignIn session={session} />}
      </body>
    </html>
  );
}
