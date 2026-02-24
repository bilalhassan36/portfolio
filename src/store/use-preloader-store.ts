import { create } from "zustand";

interface PreloaderState {
  isFinished: boolean;
  setFinished: () => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
  isFinished: false,
  setFinished: () => set({ isFinished: true }),
}));
