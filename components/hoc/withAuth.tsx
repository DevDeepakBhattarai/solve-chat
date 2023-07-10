import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function withAuth(Component: NextPage<any>) {
  return async function (props: any) {
    const session = await getServerSession(nextAuthOptions);

    if (!session) {
      redirect("/login");
    }

    return <Component {...props} />;
  };
}
