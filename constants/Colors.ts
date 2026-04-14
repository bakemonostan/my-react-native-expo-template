/**
 * Color system for the app.
 *
 * Structure:
 *  - `palette`      — raw color values (don't use directly in components)
 *  - `lightColors`  — semantic tokens for light mode
 *  - `darkColors`   — semantic tokens for dark mode
 *  - `colors`       — alias for `lightColors` (backwards-compatible, for static/non-theme-aware usage)
 *
 * In components, prefer `useTheme().colors` over importing `colors` directly,
 * so your UI responds to dark/light mode automatically.
 *
 * Replace the `primary` scale with your brand color before shipping.
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

/** Backwards-compatible alias — points to lightColors. */
export const colors = lightColors;

export type AppColors = typeof lightColors;
