import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  isAuth: false,
  user: null,

  login: (userData) => {
    if (userData) {
      set({ isAuth: true });

      localStorage.setItem("access", userData.access);
      localStorage.setItem("refresh", userData.refresh);
    }
  },

  setUser: (userData) => {
    set({ user: userData });
  },

  setIsAuth: () => {
    set({ isAuth: true });
  },

  logout: () => {
    set({ isAuth: false, user: null });

    localStorage.clear();
  },
}));
