/**
 * Central font configuration for all text components
 * 
 * This file maps font weight names to actual font families.
 * Update these values to match your project's font setup.
 * 
 * @example
 * ```tsx
 * // For custom fonts:
 * FONT_FAMILY_MAP.regular = "Inter-Regular";
 * FONT_FAMILY_MAP.bold = "Inter-Bold";
 * FONT_FAMILY_MAP.semi_bold = "Inter-SemiBold";
 * ```
 */

export type FontWeight =
  | "regular"
  | "light"
  | "medium"
  | "semi_bold"
  | "bold"
  | "extra_bold"
  | "black"
  | "variable";

/**
 * Font family mapping
 * 
 * Default: Uses system font for all weights
 * 
 * To use custom fonts:
 * 1. Load your fonts in your app
 * 2. Update this mapping with your font family names
 * 3. All components will automatically use your fonts
 */
export const FONT_FAMILY_MAP: Record<FontWeight, string> = {
  regular: "System",
  light: "System",
  medium: "System",
  semi_bold: "System",
  bold: "System",
  extra_bold: "System",
  black: "System",
  variable: "System",
};

/**
 * Helper function to get font family for a weight
 */
export function getFontFamily(weight: FontWeight = "regular"): string {
  return FONT_FAMILY_MAP[weight];
}
