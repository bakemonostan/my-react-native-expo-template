import React from "react";
import { Text, TextStyle, StyleProp } from "react-native";

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
 * A customizable Text component with TypeScript support
 *
 * @example
 * ```tsx
 * <TextComponent
 *   weight="bold"
 *   color="#007AFF"
 *   size="lg"
 *   styles={{ textAlign: 'center' }}
 * >
 *   Hello World
 * </TextComponent>
 * ```
 *
 * @example
 * ```tsx
 * <TextComponent
 *   weight="semi_bold"
 *   size={18}
 *   overrideStyles={{ fontStyle: 'italic' }}
 * >
 *   Custom styled text
 * </TextComponent>
 * ```
 */
export default function TextComponent({
  children,
  weight = "regular",
  color = "#000000",
  size = "base",
  styles,
  overrideStyles,
  ...restProps
}: TextComponentProps) {
  /**
   * Get the numeric font size value
   */
  const getFontSize = (sizeValue: FontSize): number => {
    return typeof sizeValue === "number" ? sizeValue : FONT_SIZE_MAP[sizeValue];
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
} as const;
