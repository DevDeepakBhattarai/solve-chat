import React, { ReactElement } from "react";
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
      <nav className="flex flex-col justify-between sticky left-0 top-0 h-screen max-w-[18rem] border-r-white/20 border border-transparent">
        <div>
          <div className="flex gap-2 items-start px-4 pt-8 pb-4">
            <Image
              src={Logo}
              alt="SolveChat logo"
              className="h-16 w-16 -mt-4"
            ></Image>
            <span className="text-2xl font-bold">SolveChat</span>
          </div>
          <Separator className="bg-white/20"></Separator>

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
        <UserInfo></UserInfo>
      </nav>
      <Separator orientation="vertical" className="bg-white/70"></Separator>
    </>
  );
}
