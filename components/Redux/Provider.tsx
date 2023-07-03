"use client";
import store from "@/lib/store";
import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
interface Props {
  children: ReactNode;
}

export default function MyProvider({ children }: Props): ReactElement {
  return <Provider store={store}>{children}</Provider>;
}
