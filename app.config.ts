/**
 * Primary Expo configuration (single place to edit app metadata + env wiring).
 * Optional static keys remain in `app.json` as `{}` fallback; this file wins at build time.
 *
 * @see https://docs.expo.dev/workflow/configuration/
 * @see https://docs.expo.dev/guides/environment-variables/
 * @see https://docs.expo.dev/guides/deep-linking/ (for intentFilters / associatedDomains when you add them)
 */
import type { ConfigContext, ExpoConfig } from "expo/config";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pkg = require("./package.json") as { version: string };

// --- Clone & customize (or override via env in CI) -------------------------

const isStaging =
  process.env.APP_ENV === "staging" ||
  process.env.EXPO_PUBLIC_APP_ENV === "staging";

const APP_NAME = process.env.APP_DISPLAY_NAME ?? "my-rn-template";
const SLUG = process.env.EXPO_PUBLIC_SLUG ?? "my-rn-template";
const SCHEME = process.env.EXPO_PUBLIC_SCHEME ?? "myrntemplate";

const IOS_BUNDLE_DEFAULT = "com.ehizstan.myrntemplate";
const ANDROID_PACKAGE_DEFAULT = "com.ehizstan.myrntemplate";

/** Staging bundle/package only when you set explicit env vars (avoids breaking a checked-in native project). */
const iosBundleId =
  isStaging && process.env.IOS_BUNDLE_ID_STAGING
    ? process.env.IOS_BUNDLE_ID_STAGING
    : process.env.IOS_BUNDLE_ID ?? IOS_BUNDLE_DEFAULT;

const androidPackage =
  isStaging && process.env.ANDROID_PACKAGE_STAGING
    ? process.env.ANDROID_PACKAGE_STAGING
    : process.env.ANDROID_PACKAGE ?? ANDROID_PACKAGE_DEFAULT;

function resolveApiBaseUrl(): string {
  if (isStaging && process.env.EXPO_PUBLIC_API_BASE_URL_STAGING) {
    return process.env.EXPO_PUBLIC_API_BASE_URL_STAGING;
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
}

// -----------------------------------------------------------------------------

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: SLUG,
  version: pkg.version,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: SCHEME,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  splash: {
    image: "./assets/images/splash-icon.png",
    imageWidth: 200,
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: iosBundleId,
  },

  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: androidPackage,
  },

  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },

  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-secure-store",
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    appEnv: process.env.APP_ENV ?? process.env.EXPO_PUBLIC_APP_ENV ?? "development",
    apiBaseUrl: resolveApiBaseUrl(),
    ...(process.env.EXPO_PUBLIC_APP_VERSION && {
      EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
    }),
    ...(process.env.EXPO_PUBLIC_LOG_LEVEL && {
      EXPO_PUBLIC_LOG_LEVEL: process.env.EXPO_PUBLIC_LOG_LEVEL,
    }),
  },
});
