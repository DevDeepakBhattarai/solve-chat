import Sidebar from "@/components/userList/Sidebar";
import React, { ReactElement } from "react";

interface Props {
  children: React.ReactNode;
}

export default function MessageLayout({ children }: Props): ReactElement {
  return (
    <>
      <Sidebar></Sidebar>
      {children}
    </>
  );
}
