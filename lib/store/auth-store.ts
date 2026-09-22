"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, phone: string, password: string) => Promise<void>;
  signOut: () => void;
}

const MOCK_USER: User = {
  id: "user-1",
  name: "Siti Nuraini",
  email: "siti@example.com",
  phone: "+62 812-3456-7890",
  impactKg: 18.5,
  impactSavings: 345000,
  ordersCompleted: 16,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (email: string, _password: string) => {
        // Mock auth — accept any credentials
        await new Promise((resolve) => setTimeout(resolve, 800));
        const user: User = {
          ...MOCK_USER,
          email: email || MOCK_USER.email,
        };
        set({ user, isAuthenticated: true });
      },

      signUp: async (name: string, email: string, phone: string, _password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const user: User = {
          id: `user-${Date.now()}`,
          name: name || MOCK_USER.name,
          email: email || MOCK_USER.email,
          phone: phone || MOCK_USER.phone,
          impactKg: 0,
          impactSavings: 0,
          ordersCompleted: 0,
        };
        set({ user, isAuthenticated: true });
      },

      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "bungkus-auth",
    }
  )
);
