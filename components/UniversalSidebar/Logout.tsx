"use client";
import React, { ReactElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

interface Props {}

export default function Logout({}: Props): ReactElement {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className="space-x-1 flex items-center gap-1 w-max transition-all duration-150 hover:scale-105 active:scale-95 text-sm px-0 py-0 text-white/60"
          onClick={() => {
            signOut();
          }}
        >
          Logout <LogOut className="h-4 w-4"></LogOut>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to sign out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
