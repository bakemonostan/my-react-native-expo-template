/**
 * Auth HTTP boundary — swap endpoints / payloads for your API.
 * `featureFlags.authMode === "mock"` keeps local-only success paths for UI dev.
 */
import api from "@/api/config";
import { getErrorMessage, tokenUtils } from "@/api/api.utils";
import { featureFlags } from "@/config/featureFlags";
import type { AuthUser } from "@/store/authStore";

export type AuthSuccess = { ok: true; user: AuthUser; accessToken: string };
export type AuthFailure = { ok: false; message: string };
export type AuthResult = AuthSuccess | AuthFailure;

function mapUser(raw: unknown): AuthUser {
  if (raw && typeof raw === "object" && "email" in raw) {
    const o = raw as { email: unknown; name?: unknown };
    const email = String(o.email);
    const name =
      typeof o.name === "string" && o.name.trim()
        ? o.name.trim()
        : email.split("@")[0] || "User";
    return { email, name };
  }
  throw new Error("Invalid user payload from API");
}

function mockToken(): string {
  return `mock.${Date.now()}`;
}

export async function backendSignIn(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResult> {
  if (!password) {
    return { ok: false, message: "Password is required." };
  }
  if (featureFlags.authMode === "mock") {
    await new Promise((r) => setTimeout(r, 120));
    const display =
      name?.trim() || email.split("@")[0] || "User";
    return {
      ok: true,
      user: { email, name: display },
      accessToken: mockToken(),
    };
  }
  try {
    const { data } = await api.post<{
      access_token: string;
      user: { email: string; name?: string };
    }>("/auth/login", { email, password });
    return {
      ok: true,
      user: mapUser(data.user),
      accessToken: data.access_token,
    };
  } catch (e) {
    return { ok: false, message: getErrorMessage(e) };
  }
}

export async function backendRegister(
  email: string,
  password: string,
  name: string,
): Promise<AuthResult> {
  if (!password) {
    return { ok: false, message: "Password is required." };
  }
  if (featureFlags.authMode === "mock") {
    await new Promise((r) => setTimeout(r, 120));
    const display =
      name.trim() || email.split("@")[0] || "User";
    return {
      ok: true,
      user: { email, name: display },
      accessToken: mockToken(),
    };
  }
  try {
    const { data } = await api.post<{
      access_token: string;
      user: { email: string; name?: string };
    }>("/auth/register", { email, password, name });
    return {
      ok: true,
      user: mapUser(data.user),
      accessToken: data.access_token,
    };
  } catch (e) {
    return { ok: false, message: getErrorMessage(e) };
  }
}

export async function backendVerifyOtp(
  email: string,
  code: string,
): Promise<AuthResult> {
  const digits = code.replace(/\D/g, "");
  if (digits.length < 6) {
    return { ok: false, message: "Enter a valid 6-digit code." };
  }
  if (featureFlags.authMode === "mock") {
    await new Promise((r) => setTimeout(r, 120));
    return {
      ok: true,
      user: { email, name: "Verified user" },
      accessToken: mockToken(),
    };
  }
  try {
    const { data } = await api.post<{
      access_token: string;
      user: { email: string; name?: string };
    }>("/auth/verify-otp", { email, code: digits });
    return {
      ok: true,
      user: mapUser(data.user),
      accessToken: data.access_token,
    };
  } catch (e) {
    return { ok: false, message: getErrorMessage(e) };
  }
}

/** Optional: call your “send reset email” endpoint. Mock is always success. */
export async function backendRequestPasswordReset(
  email: string,
): Promise<{ ok: true } | AuthFailure> {
  if (featureFlags.authMode === "mock") {
    await new Promise((r) => setTimeout(r, 80));
    return { ok: true };
  }
  try {
    await api.post("/auth/forgot-password", { email });
    return { ok: true };
  } catch (e) {
    return { ok: false, message: getErrorMessage(e) };
  }
}

/**
 * Restore user when a token exists but Zustand has no `user` (e.g. fresh install kept token).
 * Mock tokens never restore without persisted user — returns null.
 */
export async function fetchSessionUser(): Promise<AuthUser | null> {
  if (featureFlags.authMode === "mock") {
    return null;
  }
  try {
    const { data } = await api.get<
      { user: { email: string; name?: string } } | { email: string; name?: string }
    >("/auth/me");
    const raw = "user" in data && data.user ? data.user : data;
    return mapUser(raw);
  } catch {
    return null;
  }
}

/** Clears token; optional server logout when a token exists. */
export async function backendSignOut(): Promise<void> {
  if (featureFlags.authMode === "api") {
    const t = await tokenUtils.getToken();
    if (t) {
      try {
        await api.post("/auth/logout", {});
      } catch {
        /* ignore — still clear locally */
      }
    }
  }
  await tokenUtils.clearToken();
}
