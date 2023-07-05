import { create } from "zustand";

type Tabs = "signin" | "signup";

interface AuthState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
}
export const useAuthState = create<AuthState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  activeTab: "signin",
  setActiveTab: (tab: Tabs) => set({ activeTab: tab }),
}));
