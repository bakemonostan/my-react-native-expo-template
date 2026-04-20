import type { ThemeTokenSet } from "@/config/themeFromEnv";

/**
 * @fileoverview Central color system: shared **palette**, **light** / **dark** semantic tokens, and **`AppColors`** typing for `ThemeProvider`.
 *
 * ## Layers
 *
 * | Layer | Use |
 * |-------|-----|
 * | **`palette`** | Raw hex/RGBA scales (neutral, primary brand, status). Shared by both themes. Prefer **semantic** tokens in UI. |
 * | **`lightColors` / `darkColors`** | Semantic names: `background`, `text`, `primary`, `border`, etc. |
 * | **`colors`** | Alias of **`lightColors`** — only for static assets or non-theme code. |
 *
 * ## Usage
 *
 * - **In screens & components:** use **`useTheme().colors`** (`context/ThemeContext`) so light/dark updates automatically.
 * - **Avoid** `import { colors }` for surfaces/text that should follow the active scheme; use theme hooks instead.
 * - **Brand (quick):** set **`EXPO_PUBLIC_BRAND_PRIMARY`** when you are not using the full wizard token map.
 * - **Full semantic map:** `EXPO_PUBLIC_THEME_LIGHT_*` / `EXPO_PUBLIC_THEME_DARK_*` from RN Init — merged in `ThemeProvider` via {@link mergeSemanticTokens}.
 * - **Brand (full ramp):** edit **`palette.primary*`** here for code that still reads the shared ramp.
 *
 * @example Theme-aware (preferred)
 * ```tsx
 * import { useTheme } from "@/hooks/useTheme";
 *
 * function Card() {
 *   const { colors } = useTheme();
 *   return (
 *     <View style={{ backgroundColor: colors.surface }}>
 *       <Text style={{ color: colors.text }}>Hello</Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * @example Static light tokens (stories, one-off)
 * ```tsx
 * import { colors } from "@/constants/Colors";
 *
 * const previewBg = colors.background; // always light palette
 * ```
 */

/**
 * Shared raw scales: neutrals, primary brand ramp, status, overlays.
 * **`lightColors`** / **`darkColors`** reference this object; both themes see the same **`palette`** keys.
 */
const palette = {
  white: "#FFFFFF",
  black: "#000000",

  neutral50: "#FAFAFA",
  neutral100: "#F5F5F5",
  neutral200: "#E5E5E5",
  neutral300: "#D4D4D4",
  neutral400: "#A3A3A3",
  neutral500: "#737373",
  neutral600: "#525252",
  neutral700: "#404040",
  neutral800: "#262626",
  neutral900: "#171717",

  // Primary brand scale — swap these for your brand color
  primary100: "#EFF6FF",
  primary200: "#BFDBFE",
  primary300: "#93C5FD",
  primary400: "#60A5FA",
  primary500: "#3B82F6",
  primary600: "#2563EB",
  primary700: "#1D4ED8",
  primary800: "#1E40AF",
  primary900: "#1E3A8A",

  // Status colors
  success100: "#DCFCE7",
  success500: "#22C55E",
  warning100: "#FEF9C3",
  warning500: "#EAB308",
  error100: "#FEE2E2",
  error500: "#EF4444",

  transparent: "rgba(0, 0, 0, 0)",
  overlay20: "rgba(0, 0, 0, 0.2)",
  overlay50: "rgba(0, 0, 0, 0.5)",
} as const;

/**
 * Semantic tokens for **light** mode: light backgrounds, dark text, standard borders.
 * @see {@link darkColors} for the dark counterpart (same keys).
 */
export const lightColors = {
  palette,
  transparent: palette.transparent,

  background: palette.white,
  backgroundSecondary: palette.neutral100,
  surface: palette.white,

  text: palette.neutral900,
  textSecondary: palette.neutral500,
  textDim: palette.neutral400,

  border: palette.neutral200,
  separator: palette.neutral200,

  primary: palette.primary600,
  primaryText: palette.white,
  tint: palette.primary600,

  error: palette.error500,
  errorBackground: palette.error100,
  success: palette.success500,
  successBackground: palette.success100,
  warning: palette.warning500,
  warningBackground: palette.warning100,

  overlay: palette.overlay20,
} as const;

/**
 * Semantic tokens for **dark** mode: dark surfaces, light text, muted borders.
 * @see {@link lightColors} — identical property names for easy swapping in `ThemeProvider`.
 */
export const darkColors = {
  palette,
  transparent: palette.transparent,

  background: palette.neutral900,
  backgroundSecondary: palette.neutral800,
  surface: palette.neutral800,

  text: palette.white,
  textSecondary: palette.neutral400,
  textDim: palette.neutral500,

  border: palette.neutral700,
  separator: palette.neutral700,

  primary: palette.primary400,
  primaryText: palette.neutral900,
  tint: palette.primary400,

  error: palette.error500,
  errorBackground: "#3B1515",
  success: palette.success500,
  successBackground: "#0F2A1A",
  warning: palette.warning500,
  warningBackground: "#2A2000",

  overlay: palette.overlay50,
} as const;

/**
 * Fixed **light** semantic map — alias of {@link lightColors}.
 * Use for legacy code or non-theme contexts; prefer **`useTheme().colors`** in UI.
 */
export const colors = lightColors;

/**
 * Union of {@link lightColors} and {@link darkColors} — the shape of **`useTheme().colors`** at runtime.
 * Wizard tokens add the same keys as {@link ThemeTokenSet} (ring, surfaces, etc.) for tweakcn-style access.
 */
export type AppColors = (typeof lightColors | typeof darkColors) &
  Partial<ThemeTokenSet>;

/**
 * Applies wizard / tweakcn-style semantic tokens on top of the static light or dark base.
 */
export function mergeSemanticTokens(
  base: typeof lightColors | typeof darkColors,
  tokens: ThemeTokenSet,
): AppColors {
  return {
    ...base,
    background: tokens.background,
    backgroundSecondary: tokens.muted,
    surface: tokens.card,
    text: tokens.foreground,
    textSecondary: tokens.mutedForeground,
    textDim: tokens.mutedForeground,
    border: tokens.border,
    separator: tokens.border,
    primary: tokens.primary,
    primaryText: tokens.primaryForeground,
    tint: tokens.ring,
    error: tokens.destructive,
    errorBackground: tokens.muted,
    foreground: tokens.foreground,
    card: tokens.card,
    cardForeground: tokens.cardForeground,
    popover: tokens.popover,
    popoverForeground: tokens.popoverForeground,
    secondary: tokens.secondary,
    secondaryForeground: tokens.secondaryForeground,
    muted: tokens.muted,
    mutedForeground: tokens.mutedForeground,
    accent: tokens.accent,
    accentForeground: tokens.accentForeground,
    destructive: tokens.destructive,
    destructiveForeground: tokens.destructiveForeground,
    input: tokens.input,
    ring: tokens.ring,
  } as AppColors;
}
