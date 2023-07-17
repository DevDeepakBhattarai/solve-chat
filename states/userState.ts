import { create } from "zustand";

interface UserState {
  name: string;
  email: string;
  image: string | null;
  setUser: (user: User) => void;
  id: string;
}
export const useUser = create<UserState>((set) => ({
  name: "",
  email: "",
  image: "",
  setUser: ({ email, name, image, id }) => set({ email, name, image, id }),
  id: "",
}));
