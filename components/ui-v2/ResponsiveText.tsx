import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from "react-native";
import { FontWeight, getFontFamily } from "./fontConfig";

const guidelineBaseWidth = 375;

/**
 * Hook to get current screen width that updates on rotation
 */
function useScreenWidth() {
  const [width, setWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setWidth(window.width);
    });
    return () => subscription?.remove();
  }, []);

  return width;
}

/**
 * Moderate scale function for responsive text sizing
 * @param size - Base font size
 * @param screenWidth - Current screen width
 * @param factor - Scaling factor (default: 0.5)
 */
export const mScale = (size: number, screenWidth: number, factor = 0.5) => {
  return size + (screenWidth / guidelineBaseWidth - 1) * size * factor;
};

/**
 * Font size presets for consistent typography
 */
export type FontSize =
  | "xs" // 10
  | "sm" // 12
  | "base" // 14
  | "md" // 16
  | "lg" // 18
  | "xl" // 20
  | "xxl" // 24
  | "xxxl" // 28
  | "huge" // 32
  | "mega" // 40
  | "giant" // 48
  | number;

/**
 * Props interface for ResponsiveText
 */
export interface ResponsiveTextProps extends TextProps {
  /**
   * The text content to display
   */
  text?: string;

  /**
   * Font weight
   * @default 'regular'
   */
  weight?: FontWeight;

  /**
   * Text color
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
   * Text variant preset
   */
  variant?: keyof typeof TEXT_VARIANTS;

  /**
   * Text alignment
   */
  textAlign?: "auto" | "left" | "right" | "center" | "justify";

  /**
   * Text decoration
   */
  textDecoration?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";

  /**
   * Text decoration color
   */
  textDecorationColor?: string;

  /**
   * Font style
   */
  fontStyle?: "normal" | "italic";

  /**
   * Text transform
   */
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";

  /**
   * Custom text styles
   */
  textStyles?: StyleProp<TextStyle>;

  /**
   * Override styles
   */
  overrideStyles?: StyleProp<TextStyle>;
}

/**
 * Font size mapping
 */
const FONT_SIZE_MAP: Record<Exclude<FontSize, number>, number> = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  huge: 32,
  mega: 40,
  giant: 48,
};

/**
 * Text variant presets
 */
export const TEXT_VARIANTS = {
  h1: { weight: "bold" as FontWeight, size: "giant" as FontSize },
  h2: { weight: "bold" as FontWeight, size: "mega" as FontSize },
  h3: { weight: "semi_bold" as FontWeight, size: "huge" as FontSize },
  h4: { weight: "semi_bold" as FontWeight, size: "xxxl" as FontSize },
  h5: { weight: "medium" as FontWeight, size: "xxl" as FontSize },
  h6: { weight: "medium" as FontWeight, size: "xl" as FontSize },
  body1Bold: { weight: "bold" as FontWeight, size: "base" as FontSize },
  body1Medium: { weight: "medium" as FontWeight, size: "base" as FontSize },
  body1Regular: { weight: "regular" as FontWeight, size: "base" as FontSize },
  body2Bold: { weight: "bold" as FontWeight, size: "sm" as FontSize },
  body2Medium: { weight: "medium" as FontWeight, size: "sm" as FontSize },
  body2Regular: { weight: "regular" as FontWeight, size: "sm" as FontSize },
  caption: { weight: "regular" as FontWeight, size: "xs" as FontSize },
  button: { weight: "semi_bold" as FontWeight, size: "base" as FontSize },
} as const;

/**
 * A responsive text component with customizable typography
 *
 * @example
 * ```tsx
 * <ResponsiveText
 *   weight="bold"
 *   color="#007AFF"
 *   size="lg"
 *   responsive={true}
 *   textAlign="center"
 * >
 *   Hello World
 * </ResponsiveText>
 * ```
 *
 * @example
 * ```tsx
 * <ResponsiveText
 *   variant="h1"
 *   color="#000000"
 *   textAlign="center"
 * >
 *   Page Title
 * </ResponsiveText>
 * ```
 */
export default function ResponsiveText({
  weight = "regular",
  color = "#000000",
  size = "base",
  responsive = false,
  variant,
  textAlign,
  textDecoration,
  textDecorationColor,
  fontStyle,
  textTransform,
  text,
  textStyles,
  overrideStyles,
  children,
  style,
  ...restProps
}: ResponsiveTextProps) {
  const screenWidth = useScreenWidth();

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

    return responsive ? mScale(fontSize, screenWidth) : fontSize;
  };

  /**
   * Get variant styles if variant is provided
   */
  const getVariantStyles = () => {
    if (!variant) return {};

    const variantConfig = TEXT_VARIANTS[variant];
    return {
      fontFamily: getFontFamily(variantConfig.weight),
      fontSize: getFontSize(variantConfig.size),
    };
  };

  /**
   * Base styles for the text component
   */
  const baseStyles: TextStyle = variant
    ? getVariantStyles()
    : {
        fontFamily: getFontFamily(weight),
        fontSize: getFontSize(size),
      };

  // Apply color and convenience props to base styles
  baseStyles.color = color;
  if (textAlign) baseStyles.textAlign = textAlign;
  if (textDecoration) baseStyles.textDecorationLine = textDecoration;
  if (textDecorationColor) baseStyles.textDecorationColor = textDecorationColor;
  if (fontStyle) baseStyles.fontStyle = fontStyle;
  if (textTransform) baseStyles.textTransform = textTransform;

  /**
   * Combine all styles in the correct order of precedence:
   * baseStyles < textStyles < style < overrideStyles
   */
  const combinedStyles: StyleProp<TextStyle> = [
    baseStyles,
    textStyles,
    style,
    overrideStyles,
  ];

  return (
    <Text
      style={combinedStyles}
      {...restProps}>
      {text || children}
    </Text>
  );
}
