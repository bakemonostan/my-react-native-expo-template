import Constants from "expo-constants";

type Extra = {
  authMode?: string;
  pushSetup?: string;
};

function readExtra(): Extra {
  const e = Constants.expoConfig?.extra;
  if (e && typeof e === "object") return e as Extra;
  return {};
}

export type AuthMode = "mock" | "api";

/**
 * Build-time flags from `app.config.ts` `extra` (driven by `EXPO_PUBLIC_*` in `.env`).
 * No runtime secrets here — only booleans / mode strings already safe for the client.
 */
export const featureFlags = {
  get authMode(): AuthMode {
    return readExtra().authMode === "api" ? "api" : "mock";
  },

  /** When true, root layout registers for push + logs Expo push token in __DEV__. */
  get enablePushSetup(): boolean {
    const v = readExtra().pushSetup;
    return v === "1" || v === "true";
  },
};
