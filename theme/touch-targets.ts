import { mScale } from "@/constants/mixins";

export const TouchTargets = {
  // Minimum touch targets (Apple HIG: 44pt, Android: 48dp)
  minimum: mScale(44),
  comfortable: mScale(48),
  large: mScale(56),

  // Button padding
  button: {
    xs: {
      paddingHorizontal: mScale(8),
      paddingVertical: mScale(4),
      minHeight: mScale(32),
    },
    sm: {
      paddingHorizontal: mScale(12),
      paddingVertical: mScale(6),
      minHeight: mScale(36),
    },
    base: {
      paddingHorizontal: mScale(16),
      paddingVertical: mScale(8),
      minHeight: mScale(44),
    },
    lg: {
      paddingHorizontal: mScale(20),
      paddingVertical: mScale(12),
      minHeight: mScale(52),
    },
    xl: {
      paddingHorizontal: mScale(24),
      paddingVertical: mScale(16),
      minHeight: mScale(60),
    },
  },
} as const;
