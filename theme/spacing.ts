import { mScale } from "@/constants/mixins";

export const Spacing = {
  // Micro spacing (borders, dividers)
  xxxs: mScale(1), // 1px → ~1.1px
  xxs: mScale(2), // 2px → ~2.2px
  xs: mScale(4), // 4px → ~4.4px

  // Small spacing (tight layouts)
  sm: mScale(8), // 8px → ~8.8px
  md: mScale(12), // 12px → ~13.2px

  // Standard spacing (most common)
  base: mScale(16), // 16px → ~17.6px
  lg: mScale(20), // 20px → ~22px
  xl: mScale(24), // 24px → ~26.4px

  // Large spacing (sections, cards)
  xxl: mScale(32), // 32px → ~35.2px
  xxxl: mScale(40), // 40px → ~44px

  // Extra large (major sections)
  huge: mScale(48), // 48px → ~52.8px
  mega: mScale(64), // 64px → ~70.4px
} as const;
