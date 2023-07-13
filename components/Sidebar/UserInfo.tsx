"use client";
import { useUser } from "@/states/userState";
import React, { ReactElement } from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logout from "./Logout";

interface Props {}

export default function UserInfo({}: Props): ReactElement {
  const { email, image, name, isLoading } = useUser();
  return (
    <div className="flex">
      {isLoading && (
        <div className="flex items-center space-x-3 p-4 w-full">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="flex items-center space-x-3 p-4 w-full">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={image || undefined}
              alt={`${name}'s Profile Pic`}
            />
            <AvatarFallback>
              {name.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <span className="whitespace-nowrap block font-semibold tracking-wide">
              {name}
            </span>
            <Logout></Logout>
          </div>
        </div>
      )}
    </div>
  );
}
