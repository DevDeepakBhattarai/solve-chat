import Login from "@/components/Authentication/Login";
import Sally from "@/components/Authentication/Sally";
import Logo from "@/components/Logo";
import React, { ReactElement } from "react";

interface Props {}

export default function page({}: Props): ReactElement {
  return (
    <main className="flex h-screen p-4 gap-4">
      <div className="flex-1">
        <div className="place-items-start">
          <Logo></Logo>
        </div>
        <Login></Login>
      </div>

      <div className="w-[45%] h-full">
        <Sally></Sally>
      </div>
    </main>
  );
}
