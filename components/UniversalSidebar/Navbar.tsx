import React, { ReactElement, Suspense } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Separator } from "../ui/separator";
import {
  LayoutDashboard,
  Radio,
  FolderMinus,
  MessageCircle,
  Settings,
} from "lucide-react";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";
import { Skeleton } from "../ui/skeleton";
interface Props {}

const NavItems = [
  { text: "Dashboard", Icon: LayoutDashboard, path: "/" },
  { text: "Live Videos", Icon: Radio, path: "/live" },

  { text: "Files", Icon: FolderMinus, path: "/files" },
  { text: "Messages", Icon: MessageCircle, path: "/messages" },
  { text: "Setting", Icon: Settings, path: "setting" },
];
export default function Navbar({}: Props): ReactElement {
  return (
    <>
      <nav className="flex flex-col justify-between shrink-0 sticky left-0 top-0 h-screen max-w-[16rem] border-r-white/20 border border-transparent">
        <div>
          <div className="flex gap-2 items-center justify-center h-24 border-b border-white/20">
            <Image
              src={Logo}
              alt="SolveChat logo"
              className="h-16 w-16"
            ></Image>
            <span className="text-2xl font-bold">SolveChat</span>
          </div>

          <div className="space-y-3 p-4">
            {NavItems.map((it, index) => {
              return (
                <NavLink
                  Icon={<it.Icon />}
                  key={index}
                  name={it.text}
                  path={it.path}
                ></NavLink>
              );
            })}
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center space-x-3 p-4 w-full">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          }
        >
          <UserInfo></UserInfo>
        </Suspense>
      </nav>
      <Separator orientation="vertical" className="bg-white/70"></Separator>
    </>
  );
}
