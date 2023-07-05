"use client";
import React, { ReactElement } from "react";
import Image from "next/image";
import Saly from "../../public/Saly.png";
import { useAuthState } from "@/states/authState";
interface Props {}

export default function Sally({}: Props): ReactElement {
  const { activeTab } = useAuthState();
  return (
    <div className="rounded-lg flex justify-center h-full bg-secondary p-10">
      <div className="grid w-max h-full relative ">
        <Image
          src={Saly}
          alt="Sally"
          className="object-scale-down justify-self-center self-start"
        ></Image>

        {activeTab === "signin" && (
          <div className="text-white justify-self-center w-full pl-4">
            <span className="text-3xl font-bold">Sign in to SolveChat</span>
            <p>Empowering Minds, Solving Problems Together</p>
          </div>
        )}
        {activeTab === "signup" && (
          <div className="text-white justify-self-center w-full pl-4">
            <span className="text-3xl font-bold">Sign up to SolveChat</span>
            <p>Unlock Solutions with SolveChat, Where Questions Find Answers</p>
          </div>
        )}
      </div>
    </div>
  );
}
