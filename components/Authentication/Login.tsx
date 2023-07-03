"use client";
import React, { ReactElement, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "@/slices/AuthSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {}

export default function Login({}: Props): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const { activeTab } = useSelector((store: RootState) => store.auth);
  return (
    <div className="place-self-start -mt-16 relative z-50">
      <ToastContainer />
      <Tabs
        onKeyDown={(e) => {
          if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
            if (activeTab == "signin") dispatch(setActiveTab("signup"));
            if (activeTab == "signup") dispatch(setActiveTab("signin"));
          }
        }}
        value={activeTab}
        defaultValue="signin"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            onClick={() => dispatch(setActiveTab("signin"))}
            value="signin"
          >
            SignIn
          </TabsTrigger>
          <TabsTrigger
            onClick={() => dispatch(setActiveTab("signup"))}
            value="signup"
          >
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
