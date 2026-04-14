import { darkColors, lightColors, type AppColors } from "@/constants/Colors";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { useColorScheme } from "react-native";

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
  const systemScheme = useColorScheme() ?? "light";
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);

  const colorScheme: "light" | "dark" =
    mode === "auto" ? systemScheme : mode;
  const isDark = colorScheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
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
