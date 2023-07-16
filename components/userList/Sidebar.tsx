import React, { ReactElement } from "react";
import { Separator } from "../ui/separator";
import SearchIcon from "../Icons/SearchIcon";
import Search from "./Search";
import { MessagesSquare, Pin } from "lucide-react";
import User from "./User";

interface Props {}

export default function Sidebar({}: Props): ReactElement {
  return (
    <section className="flex flex-col grow h-screen gap-4 max-w-md border-r-white/20 border border-transparent">
      <div>
        <div className="flex justify-between items-center px-4 py-7  max-h-max">
          <span className="text-2xl font-bold text-primary">Messages</span>

          <Search></Search>
        </div>
        <Separator className="bg-white/20"></Separator>
      </div>
      <div className="px-4">
        {/* This is the pinned message section */}
        {/* Show this only when there are pinned messages */}
        <div>
          <h6 className="flex items-center gap-1  text-sm text-white/50 mb-3">
            <Pin className="h-3.5 w-3.5" /> Pinned Message
          </h6>
        </div>

        {/* This is the actual user message section */}
        <div>
          <h6 className="flex items-center gap-1  text-sm text-white/50 my-3">
            <MessagesSquare className="h-3.5 w-3.5" /> All messages
          </h6>
          <User
            latestMessage={"Hello How are you? "}
            time={new Date()}
            ownImage={""}
            hasBeenSent={false}
            isBeingSent={false}
            hasBeenSeen={false}
            noOfMessageToSee={1}
            peerImage={""}
            peerName={"John Doe"}
            userId="hellothere"
          ></User>
        </div>
      </div>
    </section>
  );
}
