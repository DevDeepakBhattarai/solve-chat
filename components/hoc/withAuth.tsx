import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { NextPage, NextPageContext } from "next";

export default function withAuth(Component: NextPage<any>) {
  return async function (props: any) {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      redirect("/login");
    }

    return <Component {...props} />;
  };
}
