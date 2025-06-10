import { mScale, scale } from "@/constants/mixins";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

/**
 * Font weight options based on the loaded Afacad Flux font family
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
 * Font size presets for consistent typography
 */
export type FontSize =
  | "xs" // 12
  | "sm" // 14
  | "base" // 16
  | "lg" // 18
  | "xl" // 20
  | "xxl" // 24
  | "xxxl" // 32
  | number;

/**
 * Props interface for the TextComponent
 */
export interface TextComponentProps {
  /**
   * The text content to display
   */
  children: React.ReactNode;

  /**
   * Font weight using the loaded Afacad Flux font variants
   * @default 'regular'
   */
  weight?: FontWeight;

  /**
   * Text color - can be any valid color string (hex, rgb, named colors, etc.)
   * @default '#000000'
   */
  color?: string;

  /**
   * Font size - can be a preset size or custom number
   * @default 'base'
   */
  size?: FontSize;

  /**
   * Apply responsive scaling to font size
   * @default false
   */
  responsive?: boolean;

  /**
   * Use moderate scaling for font size (prevents text from becoming too large/small)
   * @default true when responsive is true
   */
  moderateScale?: boolean;

  /**
   * Custom scaling factor for moderate scaling
   * @default 0.1
   */
  scaleFactor?: number;

  /**
   * Default styles applied to the text component
   * These are merged with the component's base styles
   */
  styles?: StyleProp<TextStyle>;

  /**
   * Override styles that take precedence over all other styles
   * Use this when you need to completely override specific style properties
   */
  overrideStyles?: StyleProp<TextStyle>;

  /**
   * Additional props passed to the underlying Text component
   */
  [key: string]: any;
}

/**
 * Font size mapping for consistent typography scale
 */
const FONT_SIZE_MAP: Record<Exclude<FontSize, number>, number> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

/**
 * A customizable Text component with TypeScript support and responsive scaling
 *
 * @example
 * ```tsx
 * <TextComponent
 *   weight="bold"
 *   color="#007AFF"
 *   size="lg"
 *   responsive={true}
 *   styles={{ textAlign: 'center' }}
 * >
 *   Hello World
 * </TextComponent>
 * ```
 *
 * @example
 * ```tsx
 * <TextComponent
 *   {...TEXT_VARIANTS.responsive.bodyLarge}
 *   overrideStyles={{ fontStyle: 'italic' }}
 * >
 *   Responsive text with variant
 * </TextComponent>
 * ```
 */
export default function ResponsiveText({
  children,
  weight = "regular",
  color = "#000000",
  size = "base",
  responsive = false,
  moderateScale = true,
  scaleFactor = 0.1,
  styles,
  overrideStyles,
  ...restProps
}: TextComponentProps) {
  /**
   * Get the numeric font size value with optional responsive scaling
   */
  const getFontSize = (sizeValue: FontSize): number => {
    let fontSize: number;
    if (typeof sizeValue === "number") {
      fontSize = sizeValue;
    } else {
      fontSize = FONT_SIZE_MAP[sizeValue];
    }
    if (responsive) {
      return moderateScale ? mScale(fontSize, scaleFactor) : scale(fontSize);
    }

    return fontSize;
  };

  /**
   * Base styles for the text component
   */
  const baseStyles: TextStyle = {
    fontFamily: weight,
    fontSize: getFontSize(size),
    color: color,
  };

  /**
   * Combine all styles in the correct order of precedence:
   * baseStyles < styles < overrideStyles
   */
  const combinedStyles: StyleProp<TextStyle> = [
    baseStyles,
    styles,
    overrideStyles,
  ];

  return (
    <Text style={combinedStyles} {...restProps}>
      {children}
    </Text>
  );
}

/**
 * Additional utility types for advanced usage
 */
export type TextComponentRef = React.ComponentRef<typeof Text>;

/**
 * Predefined text style variants for common use cases
 */
/**
 * Predefined text style variants for common use cases
 */
export const TEXT_VARIANTS = {
  heading1: {
    weight: "bold" as FontWeight,
    size: "xxxl" as FontSize,
    color: "#1a1a1a",
  },
  heading2: {
    weight: "semi_bold" as FontWeight,
    size: "xxl" as FontSize,
    color: "#1a1a1a",
  },
  heading3: {
    weight: "medium" as FontWeight,
    size: "xl" as FontSize,
    color: "#1a1a1a",
  },
  body: {
    weight: "regular" as FontWeight,
    size: "base" as FontSize,
    color: "#333333",
  },
  caption: {
    weight: "light" as FontWeight,
    size: "sm" as FontSize,
    color: "#666666",
  },
  button: {
    weight: "semi_bold" as FontWeight,
    size: "base" as FontSize,
    color: "#007AFF",
  },
  responsive: {
    headlineLarge: {
      weight: "bold" as FontWeight,
      size: "xl" as FontSize,
      color: "#1a1a1a",
      responsive: true,
    },
    bodyLarge: {
      weight: "regular" as FontWeight,
      size: "base" as FontSize,
      color: "#333333",
      responsive: true,
    },
  },
} as const;
