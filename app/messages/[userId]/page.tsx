import Header from "@/components/Messages/Header";
import OwnMessage from "@/components/Messages/ownMessage";
import PeerMessage from "@/components/Messages/peerMessage";
import React, { ReactElement } from "react";

interface Props {
  params: { userId: string };
}

export default function page({ params }: Props): ReactElement {
  const { userId } = params;
  return (
    <div className=" w-full">
      <Header
        name={"John Doe"}
        id={"hello"}
        image={""}
        event={"He is typing..."}
      ></Header>
      <div className="grid gap-3 p-4">
        <PeerMessage date={new Date()} peerImage="" peerName="John">
          <span>Hello there mate</span>
        </PeerMessage>
        <OwnMessage date={new Date()}>
          <span>Hello how are ya?</span>
        </OwnMessage>
      </div>
    </div>
  );
}
