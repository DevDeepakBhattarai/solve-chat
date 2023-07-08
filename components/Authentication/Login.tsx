"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthState } from "@/states/authState";
import { Dialog, DialogPortal } from "../ui/dialog";

interface Props {}

export default function Login({}: Props): ReactElement {
  const { setActiveTab, activeTab } = useAuthState();
  return (
    <div className="place-self-start -mt-16 relative z-50">
      <Dialog open={true}>
        <DialogPortal>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            theme="dark"
          />
        </DialogPortal>
      </Dialog>
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
        <TabsContent asChild value="signin">
          <LoginForm></LoginForm>
        </TabsContent>

        <TabsContent asChild value="signup">
          <RegisterForm></RegisterForm>
        </TabsContent>
      </Tabs>
    </div>
  );
}
