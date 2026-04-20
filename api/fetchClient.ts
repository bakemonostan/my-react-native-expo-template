/**
 * Fetch-based HTTP with the same base URL + bearer token behavior as `api/config.ts` (Axios).
 * Use when `EXPO_PUBLIC_HTTP_CLIENT=fetch` (see `config/featureFlags.ts` → `runtimeModes.httpClient`).
 */
import { BASE_URL } from "@/api/api.constants";
import { tokenUtils } from "@/api/api.utils";

function joinUrl(path: string): string {
  const base = BASE_URL.replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function fetchWithAuth(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const token = await tokenUtils.getToken();
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(joinUrl(path), { ...init, headers });

  if (res.status === 401) {
    await tokenUtils.clearToken();
    const { useAuthStore } = await import("@/store/authStore");
    useAuthStore.setState({ user: null, pendingOtpEmail: null });
  }

  return res;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetchWithAuth(path, init);
  const text = await res.text();
  if (!res.ok) {
    let message = res.statusText || "Request failed";
    try {
      const j = JSON.parse(text) as { message?: string };
      if (j?.message) message = String(j.message);
    } catch {
      if (text) message = text.slice(0, 200);
    }
    throw { message, status: res.status } as { message: string; status?: number };
  }
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
