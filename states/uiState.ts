import { create } from "zustand";
interface UiState {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}
export const useUiState = create<UiState>((set) => ({
  darkMode: true,
  setDarkMode: (mode) => set({ darkMode: mode }),
}));
