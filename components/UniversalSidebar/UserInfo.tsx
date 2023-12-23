import { nextAuthOptions } from "@/lib/nextAuthConfig";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logout from "./Logout";
import { useUser } from "@/states/userState";
import { redirect } from "next/navigation";

interface Props {}

export default async function UserInfo({}: Props) {
  const session = await getServerSession(nextAuthOptions);

  const { user } = session!;
  const { id, name, image, email } = user as User;
  useUser.setState({ image, name, email, id });
  return (
    <div className="flex">
      <div className="flex items-center space-x-3 p-4 w-full">
        <Avatar className="h-12 w-12">
          <AvatarImage src={image || undefined} alt={`${name}'s Profile Pic`} />
          <AvatarFallback>{name.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <span className="whitespace-nowrap block font-semibold tracking-wide">
            {name}
          </span>
          <Logout></Logout>
        </div>
      </div>
    </div>
  );
}
