/**
 * Auth session: Zustand + AsyncStorage for profile + SecureStore for access token (see `api/api.utils`).
 * HTTP lives in `services/authBackend.ts`. See `docs/AUTH_AND_NAVIGATION.md`.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tokenUtils } from "@/api/api.utils";
import {
  backendRegister,
  backendSignIn,
  backendSignOut,
  backendVerifyOtp,
} from "@/services/authBackend";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const AUTH_PERSIST_KEY = "template_auth_v1";

export type AuthUser = {
  email: string;
  name: string;
};

export type AuthActionResult =
  | { ok: true }
  | { ok: false; message: string };

export type AuthState = {
  hydrated: boolean;
  user: AuthUser | null;
  pendingOtpEmail: string | null;
  setHydrated: (value: boolean) => void;
  signIn: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<AuthActionResult>;
  signOut: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<AuthActionResult>;
  setPendingOtpEmail: (email: string | null) => void;
  verifyOtp: (code: string) => Promise<AuthActionResult>;
  updateDisplayName: (name: string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      user: null,
      pendingOtpEmail: null,
      setHydrated: (value) => set({ hydrated: value }),

      signIn: async (email, password, name) => {
        const trimmed = email.trim();
        if (!trimmed || !password) {
          return { ok: false, message: "Email and password are required." };
        }
        const res = await backendSignIn(trimmed, password, name);
        if (!res.ok) return res;
        await tokenUtils.setToken(res.accessToken);
        set({ user: res.user, pendingOtpEmail: null });
        return { ok: true };
      },

      signOut: async () => {
        await backendSignOut();
        set({ user: null, pendingOtpEmail: null });
      },

      register: async (email, password, name) => {
        const trimmed = email.trim();
        if (!trimmed || !password) {
          return { ok: false, message: "Email and password are required." };
        }
        const res = await backendRegister(trimmed, password, name.trim());
        if (!res.ok) return res;
        await tokenUtils.setToken(res.accessToken);
        set({ user: res.user, pendingOtpEmail: null });
        return { ok: true };
      },

      setPendingOtpEmail: (email) => set({ pendingOtpEmail: email }),

      verifyOtp: async (code) => {
        const email = get().pendingOtpEmail;
        if (!email) {
          return { ok: false, message: "No email pending verification." };
        }
        const res = await backendVerifyOtp(email, code);
        if (!res.ok) return res;
        await tokenUtils.setToken(res.accessToken);
        set({ user: res.user, pendingOtpEmail: null });
        return { ok: true };
      },

      updateDisplayName: (name) => {
        const u = get().user;
        if (!u) return;
        const trimmed = name.trim();
        const fallback = u.email.split("@")[0] || u.name;
        set({ user: { ...u, name: trimmed || fallback } });
      },
    }),
    {
      name: AUTH_PERSIST_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        pendingOtpEmail: state.pendingOtpEmail,
      }),
    },
  ),
);

export function useIsLoggedIn(): boolean {
  return useAuthStore((s) => s.user !== null);
}
