import { mScale } from "@/constants/mixins";

export const IconSizes = {
  xs: mScale(12), // Tiny icons
  sm: mScale(16), // Small icons
  base: mScale(20), // Standard icons
  md: mScale(24), // Medium icons
  lg: mScale(28), // Large icons
  xl: mScale(32), // Extra large icons
  xxl: mScale(40), // Header icons
  xxxl: mScale(48), // Feature icons
  huge: mScale(64), // Hero icons
} as const;
