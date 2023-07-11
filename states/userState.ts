import { create } from "zustand";

interface UserState {
  name: string;
  email: string;
  image: string | null;
  setUser: (user: User) => void;
  isLoading: boolean;
  setLoading: (bool: boolean) => void;
}
export const useUser = create<UserState>((set) => ({
  name: "",
  email: "",
  image: "",
  isLoading: true,
  setUser: ({ email, name, image }) => set({ email, name, image }),
  setLoading: (bool) => set({ isLoading: bool }),
}));
