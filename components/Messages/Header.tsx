import { CircleEllipsis, Phone, Video } from "lucide-react";
import { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      <div className="flex px-4 items-center justify-between h-24 mt-[1px] border-b border-white/20">
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

        <div className="flex gap-3 items-center justify-center">
          <div className="hover:bg-white/20 transition-all duration-150 p-2 rounded-full">
            <Video className="h-5 w-5" />
          </div>
          <div className=" hover:bg-white/20 transition-all duration-150 p-2 rounded-full">
            <Phone className="h-5 w-5"></Phone>
          </div>
          <div className=" hover:bg-white/20 transition-all duration-150 p-2 rounded-full">
            <CircleEllipsis className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
