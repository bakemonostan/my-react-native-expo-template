import { mScale, scale, vScale } from "@/constants/mixins";
import { heightToDp, widthToDp } from "@/constants/responsive";

export const BorderRadius = {
  none: 0,
  xs: mScale(2), // Subtle rounding
  sm: mScale(4), // Small elements
  base: mScale(6), // Buttons, inputs
  md: mScale(8), // Cards, containers
  lg: mScale(12), // Large cards
  xl: mScale(16), // Modal, major containers
  xxl: mScale(20), // Prominent elements
  full: 9999, // Circular/pill shape
} as const;

export const AnimationValues = {
  // Transform values (these scale with screen size)
  transform: {
    slideDistance: mScale(100),
    bounceHeight: mScale(20),
    scaleUp: 1.1, // Don't scale these
    scaleDown: 0.95, // Don't scale these
  },

  // Timing values (milliseconds - don't scale)
  duration: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  // Spring configs (don't scale)
  spring: {
    gentle: { tension: 120, friction: 14 },
    wobbly: { tension: 180, friction: 12 },
    stiff: { tension: 210, friction: 20 },
  },
} as const;

export const Shadows = {
  // iOS shadows (don't scale these)
  ios: {
    sm: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    base: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    xl: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
  },

  // Android elevation (don't scale)
  android: {
    sm: { elevation: 2 },
    base: { elevation: 4 },
    lg: { elevation: 8 },
    xl: { elevation: 16 },
  },
} as const;

export const ScaleUtils = {
  // Get responsive dimensions
  responsiveWidth: (percentage: number) => widthToDp(percentage),
  responsiveHeight: (percentage: number) => heightToDp(percentage),

  // Custom scaling with different factors
  textScale: (size: number, factor = 0.1) => mScale(size, factor),
  layoutScale: (size: number) => scale(size),
  verticalScale: (size: number) => vScale(size),

  // Conditional scaling based on screen size
  conditionalScale: (
    smallValue: number,
    largeValue: number,
    breakpoint = 400
  ) => {
    const { width } = require("@/utils/scaling");
    return width > breakpoint ? mScale(largeValue) : mScale(smallValue);
  },
} as const;
