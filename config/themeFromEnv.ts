/**
 * Loads tweakcn-style semantic tokens from `EXPO_PUBLIC_THEME_LIGHT_*` / `EXPO_PUBLIC_THEME_DARK_*`.
 * Keys must stay aligned with RN Init `react-native-init/lib/themeTokens.ts` (`THEME_TOKEN_KEYS`).
 */
import Constants from "expo-constants";

export const THEME_TOKEN_KEYS = [
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "border",
  "input",
  "ring",
] as const;

export type ThemeTokenKey = (typeof THEME_TOKEN_KEYS)[number];

export type ThemeTokenSet = Record<ThemeTokenKey, string>;

function themeKeyToEnvSuffix(key: ThemeTokenKey): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();
}

function readProcessEnv(key: string): string {
  try {
    const v = process.env[key];
    return typeof v === "string" ? v.trim() : "";
  } catch {
    return "";
  }
}

function readExtraEnv(key: string): string {
  const extra = Constants.expoConfig?.extra as Record<string, string> | undefined;
  if (!extra || typeof extra !== "object") return "";
  const v = extra[key];
  return typeof v === "string" ? v.trim() : "";
}

function readEnv(key: string): string {
  return readProcessEnv(key) || readExtraEnv(key);
}

function loadSet(mode: "light" | "dark"): Partial<ThemeTokenSet> {
  const prefix = mode === "light" ? "EXPO_PUBLIC_THEME_LIGHT_" : "EXPO_PUBLIC_THEME_DARK_";
  const out: Partial<ThemeTokenSet> = {};
  for (const key of THEME_TOKEN_KEYS) {
    const v = readEnv(`${prefix}${themeKeyToEnvSuffix(key)}`);
    if (v) out[key] = v;
  }
  return out;
}

/** If the wizard shipped a full map, every key is present for each mode. */
export function readWizardThemeFromEnv(): {
  light: ThemeTokenSet;
  dark: ThemeTokenSet;
} | null {
  const light = loadSet("light");
  const dark = loadSet("dark");
  for (const key of THEME_TOKEN_KEYS) {
    if (!light[key] || !dark[key]) return null;
  }
  return { light: light as ThemeTokenSet, dark: dark as ThemeTokenSet };
}
