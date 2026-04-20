import Constants from "expo-constants";

type Extra = {
  authMode?: string;
  pushSetup?: string;
  stateMode?: string;
  httpClient?: string;
  enableToast?: string;
  enableI18n?: string;
  enableFeatureFlags?: string;
  enableDebounce?: string;
  enableMediaPermissions?: string;
  enableKeyboard?: string;
  enableDeepLinking?: string;
};

function readExtra(): Extra {
  const e = Constants.expoConfig?.extra;
  if (e && typeof e === "object") return e as Extra;
  return {};
}

function extraBool(key: keyof Extra, defaultOn = true): boolean {
  const raw = readExtra()[key];
  if (raw === undefined || raw === null || String(raw).trim() === "") {
    return defaultOn;
  }
  const s = String(raw).toLowerCase();
  return s === "1" || s === "true";
}

/** When false, ignore `stateMode` / `httpClient` from `extra` (shipped defaults). */
function allowStateAndHttpFromExtra(): boolean {
  return extraBool("enableFeatureFlags", true);
}

export type AuthMode = "mock" | "api";

export type StateMode = "zustand" | "none";

export type HttpClientMode = "axios" | "axios+rq" | "fetch" | "none";

/**
 * Build-time flags from `app.config.ts` `extra` (driven by `EXPO_PUBLIC_*` in `.env`).
 * No runtime secrets here — only booleans / mode strings already safe for the client.
 */
export const runtimeModes = {
  /** Mirrors RN Init wizard + `EXPO_PUBLIC_STATE_MODE` (ignored when `enableFeatureFlags` extra is false). */
  get stateMode(): StateMode {
    if (!allowStateAndHttpFromExtra()) return "zustand";
    return readExtra().stateMode === "none" ? "none" : "zustand";
  },

  /** Mirrors RN Init wizard + `EXPO_PUBLIC_HTTP_CLIENT` (ignored when `enableFeatureFlags` extra is false). */
  get httpClient(): HttpClientMode {
    if (!allowStateAndHttpFromExtra()) return "axios+rq";
    const h = readExtra().httpClient?.toLowerCase();
    if (h === "axios") return "axios";
    if (h === "fetch") return "fetch";
    if (h === "none") return "none";
    return "axios+rq";
  },
};

export const featureFlags = {
  get authMode(): AuthMode {
    return readExtra().authMode === "api" ? "api" : "mock";
  },

  /** When true, root layout registers for push + logs Expo push token in __DEV__. */
  get enablePushSetup(): boolean {
    const v = readExtra().pushSetup;
    return v === "1" || v === "true";
  },

  get enableToast(): boolean {
    return extraBool("enableToast", true);
  },

  get enableI18n(): boolean {
    return extraBool("enableI18n", true);
  },

  /**
   * When false, `runtimeModes` ignores `stateMode` / `httpClient` from `extra` (always zustand + axios+rq).
   * Driven by `EXPO_PUBLIC_ENABLE_FEATURE_FLAGS` → `extra.enableFeatureFlags`.
   */
  get enableFeatureFlagEnvOverrides(): boolean {
    return extraBool("enableFeatureFlags", true);
  },

  get enableDebounce(): boolean {
    return extraBool("enableDebounce", true);
  },

  get enableMediaPermissions(): boolean {
    return extraBool("enableMediaPermissions", true);
  },

  get enableKeyboard(): boolean {
    return extraBool("enableKeyboard", true);
  },

  get enableDeepLinking(): boolean {
    return extraBool("enableDeepLinking", true);
  },
};
