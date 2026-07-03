import { create } from "zustand";
import type UserData from "../types/userData";

interface AuthStore {
  user: UserData | null;
  loading: boolean;
  setUser: (user: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ loading: value }),
  logout: () => set({ user: null }),
}));
