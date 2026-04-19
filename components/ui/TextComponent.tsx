import { useTheme } from "@/hooks/useTheme";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleProp, Text, TextProps, TextStyle } from "react-native";
import { FontWeight, getFontFamily } from "./fontConfig";

const guidelineBaseWidth = 375;

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

export const mScale = (size: number, screenWidth: number, factor = 0.5) => {
  return size + (screenWidth / guidelineBaseWidth - 1) * size * factor;
};

export type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl"
  | "huge"
  | "mega"
  | "giant"
  | number;

export interface TextComponentProps extends TextProps {
  text?: string;
  weight?: FontWeight;
  /** Omit to follow light/dark foreground */
  color?: string;
  size?: FontSize;
  responsive?: boolean;
  variant?: keyof typeof TEXT_VARIANTS;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  textDecoration?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
  textDecorationColor?: string;
  fontStyle?: "normal" | "italic";
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  textStyles?: StyleProp<TextStyle>;
  /** Same as `textStyles` (legacy name) */
  styles?: StyleProp<TextStyle>;
  overrideStyles?: StyleProp<TextStyle>;
}

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
 * App typography primitive: preset **sizes**, **variants** (h1–caption), optional **responsive** scaling,
 * and a default text color from **`ThemeContext`** (`colors.text`) unless **`color`** is set.
 *
 * @example Basic body text
 * ```tsx
 * <TextComponent weight="medium" size="base">
 *   Hello
 * </TextComponent>
 * ```
 *
 * @example Semantic variant + theme color
 * ```tsx
 * const { colors } = useTheme();
 * <TextComponent variant="h4" color={colors.text}>
 *   Section title
 * </TextComponent>
 * ```
 *
 * @example Responsive scaling on small / large screens
 * ```tsx
 * <TextComponent size="base" responsive>
 *   Scales with screen width
 * </TextComponent>
 * ```
 */
export default function TextComponent({
  weight = "regular",
  color,
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
  styles,
  overrideStyles,
  children,
  style,
  ...restProps
}: TextComponentProps) {
  const { colors } = useTheme();
  const resolvedColor = color ?? colors.text;
  const screenWidth = useScreenWidth();

  const getFontSize = (sizeValue: FontSize): number => {
    let fontSize: number;
    if (typeof sizeValue === "number") {
      fontSize = sizeValue;
    } else {
      fontSize = FONT_SIZE_MAP[sizeValue];
    }

    return responsive ? mScale(fontSize, screenWidth) : fontSize;
  };

  const getVariantStyles = () => {
    if (!variant) return {};

    const variantConfig = TEXT_VARIANTS[variant];
    return {
      fontFamily: getFontFamily(variantConfig.weight),
      fontSize: getFontSize(variantConfig.size),
    };
  };

  const baseStyles: TextStyle = variant
    ? getVariantStyles()
    : {
        fontFamily: getFontFamily(weight),
        fontSize: getFontSize(size),
      };

  baseStyles.color = resolvedColor;
  if (textAlign) baseStyles.textAlign = textAlign;
  if (textDecoration) baseStyles.textDecorationLine = textDecoration;
  if (textDecorationColor) baseStyles.textDecorationColor = textDecorationColor;
  if (fontStyle) baseStyles.fontStyle = fontStyle;
  if (textTransform) baseStyles.textTransform = textTransform;

  const combinedStyles: StyleProp<TextStyle> = [
    baseStyles,
    textStyles,
    styles,
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

export type TextComponentRef = React.ComponentRef<typeof Text>;

/** @deprecated Use `TextComponent` — same component, kept for gradual migration */
export const ResponsiveText = TextComponent;
export type ResponsiveTextProps = TextComponentProps;
