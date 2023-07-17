import React, { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDateToHoursAndMinutes } from "@/lib/utils";

interface Props {
  children: ReactElement;
  peerImage: string;
  peerName: string;
  date: Date;
}

export default function peerMessage({
  children,
  peerImage = "",
  peerName,
  date,
}: Props): ReactElement {
  return (
    <div className="grid w-max">
      <div className="flex gap-3 items-center justify-center place-self-start">
        <Avatar className="h-10 w-10 border-white/30 border">
          <AvatarImage
            src={peerImage ?? undefined}
            alt={`${peerName}'s Profile Pic`}
          />
          <AvatarFallback></AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-4 justify-center text-sm">
          <span>{peerName}</span>
          <span>{formatDateToHoursAndMinutes(date)}</span>
        </div>
      </div>
      <div className=" bg-white/10 text-white rounded-md rounded-tl-none p-2 h-max max-w-xs w-max ml-10">
        {children}
      </div>
    </div>
  );
}
