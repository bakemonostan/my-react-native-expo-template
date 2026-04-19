import { darkColors, lightColors, type AppColors } from "@/constants/Colors";
import { storage } from "@/utils/storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

const THEME_MODE_KEY = "theme_mode";

export type ThemeMode = "light" | "dark" | "auto";

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
  defaultMode = "auto",
}: ThemeProviderProps) {
  const systemScheme: "light" | "dark" =
    useColorScheme() === "dark" ? "dark" : "light";
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);

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
  const colors = isDark ? darkColors : lightColors;

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
