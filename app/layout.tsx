import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/components/Redux/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat App",
  description: "A chat app created by Deepak Bhattarai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
