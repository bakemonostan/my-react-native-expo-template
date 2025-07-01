import { colors } from "@/constants/Colors";
import { mScale } from "@/constants/mixins";
import { typography } from "@/theme/typography";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

/**
 * Font weight options based on the loaded Afacad Flux font family
 * These must match the keys in typography.fontFamily
 */
export type FontWeight = keyof typeof typography.fontFamily;

/**
 * Font size presets for consistent typography
 * These match the typography configuration
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
 * Props interface for the TextComponent
 * Extends TextProps to receive all native Text component props
 */
export interface TextComponentProps extends TextProps {
  /**
   * The text content to display
   */
  text?: string;

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
   *
   * Uses globally accepted moderate scaling (factor: 0.1)
   * Prevents text from becoming too large/small across devices
   */
  responsive?: boolean;

  // variants
  variant?: keyof typeof TEXT_VARIANTS;

  /**
   * Line height multiplier
   * @default undefined (uses typography defaults)
   */
  lineHeight?: keyof typeof typography.lineHeight;

  /**
   * Letter spacing
   * @default undefined (uses typography defaults)
   */
  letterSpacing?: keyof typeof typography.letterSpacing;

  /**
   * Text alignment
   * @default undefined
   */
  textAlign?: "auto" | "left" | "right" | "center" | "justify";

  /**
   * Text decoration
   * @default undefined
   */
  textDecoration?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";

  /**
   * Text decoration color
   * @default undefined (uses text color)
   */
  textDecorationColor?: string;

  /**
   * Text decoration style
   * @default undefined
   */
  textDecorationStyle?: "solid" | "double" | "dotted" | "dashed";

  /**
   * Font style
   * @default undefined
   */
  fontStyle?: "normal" | "italic";

  /**
   * Text transform
   * @default undefined
   */
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";

  /**
   * Default styles applied to the text component
   * These are merged with the component's base styles
   */
  textStyles?: StyleProp<TextStyle>;

  /**
   * Override styles that take precedence over all other styles
   * Use this when you need to completely override specific style properties
   */
  overrideStyles?: StyleProp<TextStyle>;
}

/**
 * Font size mapping that matches the typography configuration
 * Using raw values since typography.fontSize values are already scaled
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
 * A customizable Text component with TypeScript support and responsive scaling
 *
 * @example
 * ```tsx
 * <ResponsiveText
 *   weight="bold"
 *   color="#007AFF"
 *   size="lg"
 *   responsive={true}
 *   textAlign="center"
 *   styles={{ marginTop: 10 }}
 * >
 *   Hello World
 * </ResponsiveText>
 * ```
 *
 * @example
 * ```tsx
 * <ResponsiveText
 *   {...TEXT_VARIANTS.responsive.bodyLarge}
 *   textDecoration="underline"
 *   textDecorationColor="#FF0000"
 *   overrideStyles={{ fontStyle: 'italic' }}
 * >
 *   Responsive text with variant
 * </ResponsiveText>
 * ```
 */
export default function ResponsiveText({
  weight = "regular",
  color = colors.text,
  size = "base",
  responsive = true,
  variant,
  lineHeight,
  letterSpacing,
  textAlign,
  textDecoration,
  textDecorationColor,
  textDecorationStyle,
  fontStyle,
  textTransform,
  text,
  textStyles,
  overrideStyles,
  children,
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

    // Apply mScale only if responsive is true, since typography values are already scaled
    return responsive ? mScale(fontSize) : fontSize;
  };

  /**
   * Get variant styles if variant is provided
   */
  const getVariantStyles = () => {
    if (!variant) return {};

    const variantConfig = TEXT_VARIANTS[variant];
    return {
      fontFamily: typography.fontFamily[variantConfig.weight],
      fontSize: getFontSize(variantConfig.size),
    };
  };

  /**
   * Base styles for the text component
   */
  const baseStyles: TextStyle = variant
    ? getVariantStyles()
    : {
        fontFamily: typography.fontFamily[weight],
        fontSize: getFontSize(size),
        ...(lineHeight && { lineHeight: typography.lineHeight[lineHeight] }),
        ...(letterSpacing && {
          letterSpacing: typography.letterSpacing[letterSpacing],
        }),
      };

  // Apply color and convenience props to base styles
  baseStyles.color = color;
  if (textAlign) baseStyles.textAlign = textAlign;
  if (textDecoration) baseStyles.textDecorationLine = textDecoration;
  if (textDecorationColor) baseStyles.textDecorationColor = textDecorationColor;
  if (textDecorationStyle) baseStyles.textDecorationStyle = textDecorationStyle;
  if (fontStyle) baseStyles.fontStyle = fontStyle;
  if (textTransform) baseStyles.textTransform = textTransform;

  /**
   * Combine all styles in the correct order of precedence:
   * baseStyles < styles < overrideStyles
   */
  const combinedStyles: StyleProp<TextStyle> = [
    baseStyles,
    textStyles,
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

/**
 * Additional utility types for advanced usage
 */
export type TextComponentRef = React.ComponentRef<typeof Text>;

/**
 * Predefined text style variants for common use cases
 */
export const TEXT_VARIANTS = {
  h1: {
    weight: "bold" as FontWeight,
    size: "xxxl" as FontSize, // 28
  },
  h2: {
    weight: "bold" as FontWeight,
    size: "xxl" as FontSize, // 24
  },
  h3: {
    weight: "bold" as FontWeight,
    size: "xl" as FontSize, // 20
  },
  h4: {
    weight: "bold" as FontWeight,
    size: "lg" as FontSize, // 18
  },
  body1Light: {
    weight: "regular" as FontWeight,
    size: "md" as FontSize, // 16
  },
  body1Regular: {
    weight: "regular" as FontWeight,
    size: "md" as FontSize, // 16
  },
  body1Medium: {
    weight: "medium" as FontWeight,
    size: "md" as FontSize, // 16
  },
  body1Bold: {
    weight: "bold" as FontWeight,
    size: "md" as FontSize, // 16
  },
  body1ExtraBold: {
    weight: "extraBold" as FontWeight,
    size: "md" as FontSize, // 16
  },
  body2Light: {
    weight: "light" as FontWeight,
    size: "base" as FontSize, // 14
  },
  body2Regular: {
    weight: "regular" as FontWeight,
    size: "base" as FontSize, // 14
  },
  body2Medium: {
    weight: "medium" as FontWeight,
    size: "base" as FontSize, // 14
  },
  body2Bold: {
    weight: "bold" as FontWeight,
    size: "base" as FontSize, // 14
  },
  body3Regular: {
    weight: "regular" as FontWeight,
    size: "sm" as FontSize, // 12
  },
  body3Medium: {
    weight: "medium" as FontWeight,
    size: "sm" as FontSize, // 12
  },
  body3Bold: {
    weight: "bold" as FontWeight,
    size: "sm" as FontSize, // 12
  },
  body4Regular: {
    weight: "regular" as FontWeight,
    size: "xs" as FontSize, // 10
  },
  body4Medium: {
    weight: "medium" as FontWeight,
    size: "xs" as FontSize, // 10
  },
  body4Bold: {
    weight: "bold" as FontWeight,
    size: "xs" as FontSize, // 10
  },
} as const;
