"use client";
import { useUiState } from "@/states/uiState";
import React, { ReactElement } from "react";
import Image from "next/image";

interface Props {}

export default function Logo({}: Props): ReactElement {
  const { darkMode } = useUiState();
  return (
    <div className="relative overflow-hidden h-48 w-48">
      <Image
        src={"/logo-dark.png"}
        fill
        className="-translate-y-8 -translate-x-6 object-cover hidden dark:block"
        alt="SolveChat's Logo"
      ></Image>
      <Image
        src={"/logo-light.png"}
        fill
        className="-translate-y-8 -translate-x-6 object-cover dark:hidden"
        alt="SolveChat's Logo"
      ></Image>
    </div>
  );
}
