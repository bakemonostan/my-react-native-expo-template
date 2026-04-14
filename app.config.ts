/**
 * Dynamic Expo config (env, version from package.json).
 * No EAS project is required here — add EAS later with `npx eas-cli@latest init` if you use EAS Build/Submit.
 *
 * @see https://docs.expo.dev/workflow/configuration/
 * @see https://docs.expo.dev/guides/environment-variables/
 */
import type { ConfigContext, ExpoConfig } from "expo/config";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const appJson = require("./app.json") as { expo: ExpoConfig };
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("./package.json") as { version: string };

/**
 * API base URL baked into the client at prebuild/bundle time.
 * Set EXPO_PUBLIC_API_BASE_URL (and optionally EXPO_PUBLIC_API_BASE_URL_STAGING when APP_ENV=staging).
 */
function resolveApiBaseUrl(): string {
  const appEnv = process.env.APP_ENV ?? process.env.EXPO_PUBLIC_APP_ENV ?? "";
  if (
    (appEnv === "staging" || process.env.EXPO_PUBLIC_APP_ENV === "staging") &&
    process.env.EXPO_PUBLIC_API_BASE_URL_STAGING
  ) {
    return process.env.EXPO_PUBLIC_API_BASE_URL_STAGING;
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const base = appJson.expo;
  const baseExtra =
    typeof base.extra === "object" && base.extra !== null ? base.extra : {};

  return {
    ...config,
    ...base,
    version: pkg.version,
    extra: {
      ...baseExtra,
      appEnv: process.env.APP_ENV ?? process.env.EXPO_PUBLIC_APP_ENV ?? "development",
      apiBaseUrl: resolveApiBaseUrl(),
    },
  };
};
