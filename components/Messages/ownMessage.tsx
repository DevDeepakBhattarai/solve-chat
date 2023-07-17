import React, { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/states/userState";
import { formatDateToHoursAndMinutes } from "@/lib/utils";

interface Props {
  children: ReactElement;
  date: Date;
}

export default function ownMessage({ children, date }: Props): ReactElement {
  const { image, name } = useUser.getState();
  return (
    <div className="justify-self-end grid ">
      <div className="flex gap-3 items-center justify-center place-self-end">
        <div className="text-sm flex items-center gap-4 justify-center">
          <span>{formatDateToHoursAndMinutes(date)}</span>
          <span>You</span>
        </div>
        <Avatar className="h-10 w-10 border-white/30 border">
          <AvatarImage src={image ?? undefined} alt={`${name}'s Profile Pic`} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </div>

      <div className=" bg-blue-500 text-white rounded-md rounded-tr-none p-2 h-max max-w-xs w-max mr-10">
        {children}
      </div>
    </div>
  );
}
