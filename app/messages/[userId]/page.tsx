import Header from "@/components/Messages/Header";
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
    </div>
  );
}
