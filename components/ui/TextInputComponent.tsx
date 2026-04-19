import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { FontWeight, getFontFamily } from "./fontConfig";
import TextComponent from "./TextComponent";

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
  | number;

/**
 * Props interface for the TextInputComponent
 */
export interface TextInputComponentProps extends TextInputProps {
  /**
   * Font weight using the loaded Afacad Flux font variants
   * @default 'regular'
   */
  weight?: FontWeight;

  /**
   * Text color — defaults to theme `colors.text`.
   */
  color?: string;

  /**
   * Font size — preset or custom number
   * @default 'base'
   */
  size?: FontSize;

  /**
   * Custom styles applied to the text input
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * Error border + message color — defaults to theme `colors.error`.
   */
  errorColor?: string;
}

const FONT_SIZE_MAP: Record<Exclude<FontSize, number>, number> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

/**
 * Theme-aware `TextInput`: typography, borders, placeholder, and error colors
 * follow `useTheme()` (light/dark). Prefer {@link FormField} when you need a label or icons.
 */
export default function TextInputComponent({
  weight = "regular",
  color,
  size = "base",
  inputStyle,
  style,
  error,
  errorColor,
  placeholderTextColor,
  selectionColor,
  cursorColor,
  onFocus,
  onBlur,
  ...restProps
}: TextInputComponentProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const resolvedColor = color ?? colors.text;
  const resolvedErrorColor = errorColor ?? colors.error;

  const borderColor = error
    ? resolvedErrorColor
    : focused
      ? colors.primary
      : colors.border;

  const getFontSize = (sizeValue: FontSize): number => {
    return typeof sizeValue === "number" ? sizeValue : FONT_SIZE_MAP[sizeValue];
  };

  const baseStyles: TextStyle = {
    fontFamily: getFontFamily(weight),
    fontSize: getFontSize(size),
    color: resolvedColor,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor,
    padding: 8,
    borderRadius: 4,
  };

  const combinedStyles: StyleProp<TextStyle> = [baseStyles, inputStyle, style];

  const handleFocus: NonNullable<TextInputProps["onFocus"]> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: NonNullable<TextInputProps["onBlur"]> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <View>
      <TextInput
        {...restProps}
        style={combinedStyles}
        placeholderTextColor={placeholderTextColor ?? colors.textDim}
        selectionColor={selectionColor ?? colors.primary}
        cursorColor={cursorColor ?? resolvedColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {error && (
        <TextComponent
          size="xs"
          color={resolvedErrorColor}
          style={{ marginTop: 4 }}
        >
          {error}
        </TextComponent>
      )}
    </View>
  );
}
