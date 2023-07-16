import React, { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Camera,
  CircleEllipsis,
  MoreHorizontal,
  Phone,
  Video,
} from "lucide-react";
import { Separator } from "../ui/separator";

interface Props {
  name: string;
  id: string;
  image: string;
  event: string;
}

export default function Header({
  name,
  id,
  image,
  event,
}: Props): ReactElement {
  return (
    <div>
      <div className="flex px-4 items-center justify-between h-24 border-b border-white/20">
        <div className="flex gap-6 items-center justify-between">
          <Avatar className="h-14 w-14">
            <AvatarImage src={image} alt={`${name}'s Profile Pic`} />
            <AvatarFallback></AvatarFallback>
          </Avatar>

          <div>
            <div className="font-semibold text-lg">{name}</div>
            <div className=" text-white/60">{event}</div>
          </div>
        </div>

        <div className="flex gap-4  items-center justify-center">
          <Phone className="h-6 w-6"></Phone>
          <Video className="h-6 w-6" />
          <CircleEllipsis className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
