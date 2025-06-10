import { mScale } from "@/constants/mixins";

export const Typography = {
  fontSize: {
    // Small text
    xs: mScale(10), // Captions, fine print
    sm: mScale(12), // Small labels
    base: mScale(14), // Body text, default
    md: mScale(16), // Larger body text
    lg: mScale(18), // Subheadings

    // Headings
    xl: mScale(20), // H4
    xxl: mScale(24), // H3
    xxxl: mScale(28), // H2
    huge: mScale(32), // H1
    mega: mScale(40), // Display text
    giant: mScale(48), // Hero text
  },

  lineHeight: {
    tight: 1.2, // Headings
    normal: 1.4, // Body text
    relaxed: 1.6, // Reading text
    loose: 1.8, // Large text blocks
  },

  letterSpacing: {
    tight: mScale(-0.5),
    normal: 0,
    wide: mScale(0.5),
    wider: mScale(1),
    widest: mScale(2),
  },
} as const;
