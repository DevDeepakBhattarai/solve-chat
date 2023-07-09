"use client";

import React, { ReactElement } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface Props {}

export default function Logout({}: Props): ReactElement {
  return <Button onClick={() => signOut()}>LogOut</Button>;
}
