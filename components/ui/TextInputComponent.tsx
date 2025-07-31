import React from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";

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
  | "black";

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
   * Custom styles applied to the text input
   */
  inputStyle?: StyleProp<TextStyle>;

  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * Error text color
   * @default '#FF3B30'
   */
  errorColor?: string;
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
};

/**
 * A customizable TextInput component with consistent typography and error handling.
 * 
 * ## Features
 * - **Font Weight Support**: All Afacad Flux font weights
 * - **Flexible Sizing**: Preset sizes or custom numeric values
 * - **Error Display**: Built-in error message display below input
 * - **Custom Styling**: Override input and error styles
 * - **Type Safety**: TypeScript validates all font weights and sizes
 * - **Consistent Design**: Matches TextComponent typography system
 * 
 * ## Font Weights
 * - `light`, `regular`, `medium`, `semi_bold`, `bold`, `extra_bold`, `black`
 * 
 * ## Font Sizes
 * - `xs` (12), `sm` (14), `base` (16), `lg` (18), `xl` (20), `xxl` (24)
 *
 * @example
 * ```tsx
 * // Basic text input with error handling
 * <TextInputComponent
 *   weight="medium"
 *   color="#007AFF"
 *   size="lg"
 *   placeholder="Enter your name"
 *   inputStyle={{ padding: 12 }}
 *   error="Name is required"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Multiline text input
 * <TextInputComponent
 *   weight="regular"
 *   size={18}
 *   multiline
 *   numberOfLines={4}
 *   placeholder="Enter description..."
 *   inputStyle={{ padding: 16, textAlignVertical: 'top' }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Text input with custom error styling
 * <TextInputComponent
 *   weight="medium"
 *   size="base"
 *   placeholder="Email address"
 *   error="Please enter a valid email"
 *   errorColor="#FF3B30"
 *   inputStyle={{
 *     borderWidth: 2,
 *     borderRadius: 8,
 *     padding: 12
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Secure text input for passwords
 * <TextInputComponent
 *   weight="medium"
 *   size="base"
 *   placeholder="Password"
 *   secureTextEntry
 *   inputStyle={{
 *     borderWidth: 1,
 *     borderRadius: 8,
 *     padding: 12,
 *     backgroundColor: '#F8F9FA'
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Large text input for titles
 * <TextInputComponent
 *   weight="bold"
 *   size="xl"
 *   placeholder="Enter title"
 *   inputStyle={{
 *     fontSize: 24,
 *     padding: 16,
 *     borderBottomWidth: 2,
 *     borderBottomColor: '#007AFF'
 *   }}
 * />
 * ```
 */
export default function TextInputComponent({
  weight = "regular",
  color = "#000000",
  size = "base",
  inputStyle,
  style,
  error,
  errorColor = "#FF3B30",
  ...restProps
}: TextInputComponentProps) {
  /**
   * Get the numeric font size value
   */
  const getFontSize = (sizeValue: FontSize): number => {
    return typeof sizeValue === "number" ? sizeValue : FONT_SIZE_MAP[sizeValue];
  };

  /**
   * Base styles for the text input component
   */
  const baseStyles: TextStyle = {
    fontFamily: weight,
    fontSize: getFontSize(size),
    color: error ? errorColor : color,
    borderWidth: 1,
    borderColor: error ? errorColor : "transparent",
    padding: 8,
    borderRadius: 4,
  };

  /**
   * Combine base styles with custom styles
   */
  const combinedStyles: StyleProp<TextStyle> = [baseStyles, inputStyle, style];

  return (
    <View>
      <TextInput
        style={combinedStyles}
        placeholderTextColor={color + "80"} // 50% opacity of text color
        {...restProps}
      />
      {error && (
        <Text
          style={{
            color: errorColor,
            fontSize: 12,
            marginTop: 4,
            fontFamily: weight,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
