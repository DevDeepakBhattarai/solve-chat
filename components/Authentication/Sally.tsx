"use client";
import React, { ReactElement } from "react";
import Image from "next/image";
import Saly from "../../public/Saly.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
interface Props {}

export default function Sally({}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const { activeTab } = useSelector((store: RootState) => store.auth);
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
