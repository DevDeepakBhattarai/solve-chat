import { formatDate } from "@/lib/utils";
import { CheckCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  latestMessage: string;
  time: Date;
  ownImage: string;
  hasBeenSent: boolean;
  isBeingSent: boolean;
  hasBeenSeen: boolean;
  peerImage: string;
  peerName: string;
  roomId: string;
  noOfMessageToSee: number;
}

export default function User({
  latestMessage,
  time,
  ownImage,
  hasBeenSent,
  isBeingSent,
  hasBeenSeen,
  peerImage,
  roomId,
  peerName,
  noOfMessageToSee,
}: Props): ReactElement {
  return (
    <Link
      href={`/messages/${roomId}`}
      className="flex gap-4 items-center justify-between hover:bg-white/20 p-2 rounded-md transition-all duration-150"
    >
      <div className="flex gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={ownImage} alt={`${peerName}'s Profile Pic`} />

          <AvatarFallback>
            {peerName.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="font-semibold">{peerName}</div>
          <div className="text-sm text-white/60">{latestMessage}</div>
        </div>
      </div>

      <div className=" grid place-items-center">
        <div className="text-sm  text-white/60">{formatDate(time)}</div>
        <div>
          {/* This monstrosity renders the icon of (message sent, sending,seen) in the user preview thing,conditionally //! PS: sorry future me */}
          {noOfMessageToSee !== 0 ? (
            <div className="h-4 w-4 bg-red-500 grid place-items-center rounded-full text-xs text-white">
              {noOfMessageToSee}
            </div>
          ) : hasBeenSent ? (
            <CheckCheck className="h-4 w-4" color="green" />
          ) : isBeingSent ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : hasBeenSeen ? (
            <Avatar className="h-4 w-4">
              <AvatarImage src={peerImage} alt={`${peerName}'s Profile Pic`} />
              <AvatarFallback>
                {peerName.substring(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
