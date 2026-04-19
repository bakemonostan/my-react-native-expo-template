import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const AUTH_PERSIST_KEY = "template_auth_v1";

/** Minimal user shape for the template (swap for your API user). */
export type AuthUser = {
  email: string;
  name: string;
};

export type AuthState = {
  /**
   * `true` after Zustand persist has finished (set from root `_layout` via
   * `persist.onFinishHydration` — not persisted).
   */
  hydrated: boolean;
  user: AuthUser | null;
  /** Email waiting for OTP verification (forgot-password / verify flow). */
  pendingOtpEmail: string | null;
  setHydrated: (value: boolean) => void;
  /** Mock sign-in: any non-empty password succeeds. */
  signIn: (email: string, _password: string, name?: string) => void;
  signOut: () => void;
  /** Mock register then session. */
  register: (email: string, _password: string, name: string) => void;
  setPendingOtpEmail: (email: string | null) => void;
  /** Mock: accepts any code with ≥ 6 digits when `pendingOtpEmail` is set. */
  verifyOtp: (code: string) => boolean;
  /** Update the signed-in user's display name (local mock; replace with API patch). */
  updateDisplayName: (name: string) => void;
};

/**
 * Generic auth session for the template (Zustand + persist).
 * Replace `signIn` / `register` / `verifyOtp` with real API calls and store tokens in SecureStore.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      user: null,
      pendingOtpEmail: null,
      setHydrated: (value) => set({ hydrated: value }),
      signIn: (email, _password, name) => {
        const display = name?.trim() || email.split("@")[0] || "User";
        set({ user: { email: email.trim(), name: display }, pendingOtpEmail: null });
      },
      signOut: () => set({ user: null, pendingOtpEmail: null }),
      register: (email, _password, name) => {
        const display = name.trim() || email.split("@")[0] || "User";
        set({ user: { email: email.trim(), name: display }, pendingOtpEmail: null });
      },
      setPendingOtpEmail: (email) => set({ pendingOtpEmail: email }),
      verifyOtp: (code) => {
        const digits = code.replace(/\D/g, "");
        const email = get().pendingOtpEmail;
        if (!email || digits.length < 6) return false;
        set({
          user: { email, name: "Verified user" },
          pendingOtpEmail: null,
        });
        return true;
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
    }
  )
);

export function useIsLoggedIn(): boolean {
  return useAuthStore((s) => s.user !== null);
}
