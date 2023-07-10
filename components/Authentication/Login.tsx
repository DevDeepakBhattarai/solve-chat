"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthState } from "@/states/authState";
import { ReactElement } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface Props {}

export default function Login({}: Props): ReactElement {
  const { setActiveTab, activeTab } = useAuthState();
  return (
    <div className="place-self-start -mt-16 relative z-50">
      <Tabs
        onKeyDown={(e) => {
          if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
            if (activeTab == "signin") setActiveTab("signup");
            if (activeTab == "signup") setActiveTab("signin");
          }
        }}
        value={activeTab}
        defaultValue="signin"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger onClick={() => setActiveTab("signin")} value="signin">
            SignIn
          </TabsTrigger>
          <TabsTrigger onClick={() => setActiveTab("signup")} value="signup">
            SignUp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <LoginForm></LoginForm>
        </TabsContent>

        <TabsContent value="signup">
          <RegisterForm></RegisterForm>
        </TabsContent>
      </Tabs>
    </div>
  );
}
