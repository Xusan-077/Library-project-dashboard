import { create } from "zustand";

export const useLeftComponent = create((set, get) => ({
  isFull: "full",

  setFull: () => {
    const current = get().isFull;
    set({ isFull: current === "full" ? "icon" : "full" });
  },
}));
