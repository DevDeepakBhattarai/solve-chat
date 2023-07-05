"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
export default function Home() {
  return (
    <div className="">
      Hello There mate
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" defaultChecked>
            Account
          </TabsTrigger>
          <TabsTrigger value="signup">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <div>hello there mate</div>
        </TabsContent>

        <TabsContent value="signup">
          <div>hello what is up mate</div>
        </TabsContent>
      </Tabs>
      <Button onClick={() => signIn()}></Button>
    </div>
  );
}
