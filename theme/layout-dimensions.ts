import { mScale, scale } from "@/constants/mixins";
import { heightToDp } from "@/constants/responsive";

export const Layout = {
  // Screen padding
  screen: {
    paddingHorizontal: mScale(20),
    paddingVertical: mScale(16),
  },

  // Container max widths
  container: {
    sm: scale(480),
    md: scale(640),
    lg: scale(768),
    xl: scale(1024),
  },

  // Navigation
  navigation: {
    tabBar: {
      height: mScale(80),
      paddingBottom: mScale(8),
      iconSize: mScale(24),
    },
    header: {
      height: mScale(88),
      titleSize: mScale(18),
      buttonSize: mScale(44),
    },
  },

  // Common component heights
  heights: {
    searchBar: mScale(44),
    // toolbar: mSpace(56),
    banner: heightToDp("25%"),
    footer: mScale(60),
  },
} as const;
