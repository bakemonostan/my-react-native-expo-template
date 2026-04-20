import { readWizardThemeFromEnv } from "@/config/themeFromEnv";
import {
  darkColors,
  lightColors,
  mergeSemanticTokens,
  type AppColors,
} from "@/constants/Colors";
import { storage } from "@/utils/storage";
import Constants from "expo-constants";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "auto";

/** From `.env` at bundle time — overrides semantic `primary` / `tint` only (see `constants/Colors.ts` palette). */
const BRAND_PRIMARY_HEX =
  process.env.EXPO_PUBLIC_BRAND_PRIMARY?.trim().toUpperCase() ?? "";

function readThemeModeFromExtra(): ThemeMode {
  const raw = (Constants.expoConfig?.extra as { themeMode?: string } | undefined)
    ?.themeMode;
  if (raw === "light" || raw === "dark" || raw === "auto") return raw;
  return "auto";
}

function applyBrandPrimary(base: AppColors, hex: string): AppColors {
  if (!hex) return base;
  if (!/^#(?:[0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(hex)) return base;
  return { ...base, primary: hex, tint: hex } as AppColors;
}

const THEME_MODE_KEY = "theme_mode";

interface ThemeContextValue {
  /** Current mode setting: "light", "dark", or "auto" (follows system). */
  mode: ThemeMode;
  /** Resolved scheme after considering mode + system preference. */
  colorScheme: "light" | "dark";
  /** Active color tokens — use these in your components. */
  colors: AppColors;
  /** Convenience flag. */
  isDark: boolean;
  /**
   * Programmatically override the theme at runtime.
   * Pass "auto" to go back to following the system.
   */
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "auto",
  colorScheme: "light",
  colors: lightColors,
  isDark: false,
  setMode: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Starting mode.
   * Defaults to "auto" (follows system preference).
   * Set to "light" to opt out of dark mode entirely.
   */
  defaultMode?: ThemeMode;
}

export function ThemeProvider({
  children,
  defaultMode,
}: ThemeProviderProps) {
  const systemScheme: "light" | "dark" =
    useColorScheme() === "dark" ? "dark" : "light";
  const initialMode = defaultMode ?? readThemeModeFromExtra();
  const [mode, setModeState] = useState<ThemeMode>(initialMode);

  // Restore persisted theme preference on mount
  useEffect(() => {
    storage.get(THEME_MODE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark" || saved === "auto") {
        setModeState(saved);
      }
    });
  }, []);

  const colorScheme: "light" | "dark" =
    mode === "auto" ? systemScheme : mode;
  const isDark = colorScheme === "dark";
  const colors = useMemo(() => {
    const base = isDark ? darkColors : lightColors;
    const wizard = readWizardThemeFromEnv();
    if (wizard) {
      const tokens = isDark ? wizard.dark : wizard.light;
      return mergeSemanticTokens(base, tokens);
    }
    return applyBrandPrimary(base, BRAND_PRIMARY_HEX);
  }, [isDark]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    storage.set(THEME_MODE_KEY, newMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, colorScheme, colors, isDark, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Returns the active theme colors and helpers.
 *
 * @example
 * const { colors, isDark } = useTheme();
 * <View style={{ backgroundColor: colors.background }} />
 */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
