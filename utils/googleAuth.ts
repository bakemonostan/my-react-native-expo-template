import { z } from "zod";

/**
 * **Optional** Google Sign-In helper — **not** wired to auth UI or `authStore`.
 *
 * **What you do**
 * 1. Create OAuth client IDs in [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
 * 2. Set env vars (never commit real values): `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`, `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
 *    (e.g. `.env` — see [Expo env vars](https://docs.expo.dev/guides/environment-variables/)).
 * 3. Install and configure the native module when you need Google on device:
 *    [@react-native-google-signin/google-signin](https://react-native-google-signin.github.io/docs/install).
 * 4. Call `GoogleSignin.configure({ ...getGoogleNativeClientIds(), scopes: [...] })`, then `signIn` / `getTokens`,
 *    exchange tokens with **your** API, then update session (e.g. `useAuthStore` or SecureStore).
 *
 * This file only validates env and exposes IDs so the template stays dependency-free until you add the package.
 */

const googleEnvSchema = z.object({
  iosClientId: z.string().min(1),
  webClientId: z.string().min(1),
});

export type GoogleNativeClientIds = z.infer<typeof googleEnvSchema>;

function readGoogleEnvFromProcess(): Record<string, string> {
  return {
    iosClientId:
      process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID?.trim() ?? "",
    webClientId:
      process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim() ?? "",
  };
}

export type GoogleAuthEnvResult =
  | { ok: true; clientIds: GoogleNativeClientIds }
  | {
      ok: false;
      message: string;
      missingKeys: ("iosClientId" | "webClientId")[];
    };

/**
 * Reads `EXPO_PUBLIC_GOOGLE_*` IDs from the Metro bundle env.
 * Returns `{ ok: true, clientIds }` when both are non-empty, otherwise a safe `{ ok: false, ... }` for UI gating.
 */
export function parseGoogleAuthEnv(): GoogleAuthEnvResult {
  const raw = readGoogleEnvFromProcess();
  const parsed = googleEnvSchema.safeParse(raw);
  if (parsed.success) {
    return { ok: true, clientIds: parsed.data };
  }
  const missingKeys: ("iosClientId" | "webClientId")[] = [];
  if (!raw.iosClientId) missingKeys.push("iosClientId");
  if (!raw.webClientId) missingKeys.push("webClientId");
  return {
    ok: false,
    missingKeys,
    message:
      "Set EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID and EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID (e.g. in .env). Do not commit client secrets.",
  };
}

/**
 * Same as {@link parseGoogleAuthEnv} but throws if IDs are missing — use before `GoogleSignin.configure`.
 */
export function getGoogleNativeClientIds(): GoogleNativeClientIds {
  const r = parseGoogleAuthEnv();
  if (!r.ok) {
    throw new Error(r.message);
  }
  return r.clientIds;
}
