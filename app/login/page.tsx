import Login from "@/components/Authentication/Login";
import Sally from "@/components/Authentication/Sally";
import Logo from "@/components/Logo";
import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {}

export default async function page({}: Props) {
  const session = await getServerSession(nextAuthOptions);
  if (session) redirect("/");
  return (
    <main className="flex h-screen p-4 gap-4">
      <div className="flex-1">
        <div className="place-items-start">
          <Logo></Logo>
        </div>
        <Login></Login>
      </div>

      <div className="w-[45%] h-full md:block hidden">
        <Sally></Sally>
      </div>
    </main>
  );
}
