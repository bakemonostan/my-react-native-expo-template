/**
 * Primary Expo configuration (single place to edit app metadata + env wiring).
 * Optional static keys remain in `app.json` as `{}` fallback; this file wins at build time.
 *
 * @see https://docs.expo.dev/workflow/configuration/
 * @see https://docs.expo.dev/guides/environment-variables/
 * @see https://docs.expo.dev/guides/deep-linking/ (for intentFilters / associatedDomains when you add them)
 */
import type { ConfigContext, ExpoConfig } from 'expo/config';

const pkg = require('./package.json') as { version: string };

// --- Clone & customize (or override via env in CI) -------------------------

const isStaging =
  process.env.APP_ENV === 'staging' ||
  process.env.EXPO_PUBLIC_APP_ENV === 'staging';

/**
 * Controls the native UI mode.
 * Set THEME_MODE=light to opt out of dark mode entirely.
 * Or run: node scripts/theme-mode.js [light|dark|auto]
 */
const themeMode = process.env.THEME_MODE ?? 'auto';
const userInterfaceStyle =
  themeMode === 'light' ? 'light' : themeMode === 'dark' ? 'dark' : 'automatic';

const APP_NAME = process.env.APP_DISPLAY_NAME ?? 'my-rn-template';
const SLUG = process.env.EXPO_PUBLIC_SLUG ?? 'my-rn-template';
const SCHEME = process.env.EXPO_PUBLIC_SCHEME ?? 'myrntemplate';

const IOS_BUNDLE_DEFAULT = 'com.ehizstan.myrntemplate';
const ANDROID_PACKAGE_DEFAULT = 'com.ehizstan.myrntemplate';

/** Staging bundle/package only when you set explicit env vars (avoids breaking a checked-in native project). */
const iosBundleId =
  isStaging && process.env.IOS_BUNDLE_ID_STAGING
    ? process.env.IOS_BUNDLE_ID_STAGING
    : (process.env.IOS_BUNDLE_ID ?? IOS_BUNDLE_DEFAULT);

const androidPackage =
  isStaging && process.env.ANDROID_PACKAGE_STAGING
    ? process.env.ANDROID_PACKAGE_STAGING
    : (process.env.ANDROID_PACKAGE ?? ANDROID_PACKAGE_DEFAULT);

/** 1/true = on, 0/false = off, unset = defaultOn (template stays permissive when env is missing). */
function truthyEnv(raw: string | undefined, defaultOn: boolean): boolean {
  const t = raw?.trim() ?? "";
  if (t === "") return defaultOn;
  return t === "1" || t.toLowerCase() === "true";
}

const enableDeepLinking = truthyEnv(
  process.env.EXPO_PUBLIC_ENABLE_DEEP_LINKING,
  true,
);

const associatedDomainsRaw =
  process.env.EXPO_PUBLIC_IOS_ASSOCIATED_DOMAINS?.trim() ?? "";
const iosAssociatedDomains: string[] =
  enableDeepLinking && associatedDomainsRaw
    ? associatedDomainsRaw
        .split(",")
        .map((part: string) => part.trim())
        .filter((host: string) => host.length > 0)
        .map((host: string) => `applinks:${host}`)
    : [];

const authModeEnv =
  process.env.EXPO_PUBLIC_AUTH_MODE === "api" ? "api" : "mock";
const pushSetupEnv =
  process.env.EXPO_PUBLIC_PUSH_SETUP === "1" ||
  process.env.EXPO_PUBLIC_PUSH_SETUP === "true"
    ? "true"
    : "false";

const stateModeEnv =
  process.env.EXPO_PUBLIC_STATE_MODE === "none" ? "none" : "zustand";

function normalizeHttpClient(): "axios" | "axios+rq" | "fetch" | "none" {
  const raw = (process.env.EXPO_PUBLIC_HTTP_CLIENT ?? "axios+rq").toLowerCase();
  if (raw === "axios") return "axios";
  if (raw === "fetch") return "fetch";
  if (raw === "none") return "none";
  return "axios+rq";
}

function resolveApiBaseUrl(): string {
  if (isStaging && process.env.EXPO_PUBLIC_API_BASE_URL_STAGING) {
    return process.env.EXPO_PUBLIC_API_BASE_URL_STAGING;
  }
  return process.env.EXPO_PUBLIC_API_BASE_URL ?? '';
}

// -----------------------------------------------------------------------------

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_NAME,
  slug: SLUG,
  version: pkg.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: SCHEME,
  userInterfaceStyle,

  splash: {
    image: './assets/images/splash-icon.png',
    imageWidth: 200,
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: iosBundleId,
    ...(iosAssociatedDomains.length > 0
      ? { associatedDomains: iosAssociatedDomains }
      : {}),
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: androidPackage,
    intentFilters: enableDeepLinking
      ? [
          {
            action: 'VIEW',
            autoVerify: true,
            data: [
              {
                scheme: SCHEME,
              },
            ],
            category: ['BROWSABLE', 'DEFAULT'],
          },
        ]
      : [],
  },

  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },

  plugins: [
    'expo-router',
    '@react-native-community/datetimepicker',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    'expo-secure-store',
    'expo-localization',
    [
      'expo-notifications',
      {
        icon: './assets/images/icon.png',
        color: '#ffffff',
        sounds: [],
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    themeMode:
      themeMode === "light"
        ? "light"
        : themeMode === "dark"
          ? "dark"
          : "auto",
    appEnv:
      process.env.APP_ENV ?? process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
    apiBaseUrl: resolveApiBaseUrl(),
    authMode: authModeEnv,
    pushSetup: pushSetupEnv,
    stateMode: stateModeEnv,
    httpClient: normalizeHttpClient(),
    enableToast: truthyEnv(process.env.EXPO_PUBLIC_ENABLE_TOAST, true)
      ? "true"
      : "false",
    enableI18n: truthyEnv(process.env.EXPO_PUBLIC_ENABLE_I18N, true)
      ? "true"
      : "false",
    enableFeatureFlags: truthyEnv(
      process.env.EXPO_PUBLIC_ENABLE_FEATURE_FLAGS,
      true,
    )
      ? "true"
      : "false",
    enableDebounce: truthyEnv(process.env.EXPO_PUBLIC_ENABLE_DEBOUNCE, true)
      ? "true"
      : "false",
    enableMediaPermissions: truthyEnv(
      process.env.EXPO_PUBLIC_ENABLE_MEDIA_PERMISSIONS,
      true,
    )
      ? "true"
      : "false",
    enableKeyboard: truthyEnv(process.env.EXPO_PUBLIC_ENABLE_KEYBOARD, true)
      ? "true"
      : "false",
    enableDeepLinking: truthyEnv(
      process.env.EXPO_PUBLIC_ENABLE_DEEP_LINKING,
      true,
    )
      ? "true"
      : "false",
    ...(process.env.EXPO_PUBLIC_APP_VERSION && {
      EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
    }),
    ...(process.env.EXPO_PUBLIC_LOG_LEVEL && {
      EXPO_PUBLIC_LOG_LEVEL: process.env.EXPO_PUBLIC_LOG_LEVEL,
    }),
  },
});
