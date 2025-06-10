import { mScale, scale, vScale } from "@/constants/mixins";
import { heightToDp, widthToDp } from "@/constants/responsive";

export const ComponentSizes = {
  // Input fields
  input: {
    height: {
      sm: mScale(36),
      base: mScale(44),
      lg: mScale(52),
      xl: mScale(60),
    },
    padding: {
      sm: mScale(8),
      base: mScale(12),
      lg: mScale(16),
      xl: mScale(20),
    },
  },

  // Avatar sizes
  avatar: {
    xs: mScale(24),
    sm: mScale(32),
    base: mScale(40),
    md: mScale(48),
    lg: mScale(56),
    xl: mScale(64),
    xxl: mScale(80),
    xxxl: mScale(96),
  },

  // Card dimensions
  card: {
    padding: {
      sm: mScale(12),
      base: mScale(16),
      lg: mScale(20),
      xl: mScale(24),
    },
    minHeight: {
      sm: mScale(80),
      base: mScale(120),
      lg: mScale(160),
      xl: mScale(200),
    },
  },

  // List items
  listItem: {
    height: {
      compact: mScale(44),
      comfortable: mScale(56),
      spacious: mScale(72),
    },
    padding: {
      sm: mScale(12),
      base: mScale(16),
      lg: mScale(20),
    },
  },

  // Modal/Sheet dimensions
  modal: {
    small: {
      width: scale(280),
      maxHeight: vScale(400),
    },
    medium: {
      width: scale(320),
      maxHeight: vScale(500),
    },
    large: {
      width: scale(360),
      maxHeight: vScale(600),
    },
    fullWidth: {
      width: widthToDp("90%"),
      maxHeight: heightToDp("80%"),
    },
  },
} as const;
