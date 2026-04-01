import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import IconComponent from "./IconComponent";
import TextComponent from "./TextComponent";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertComponentProps {
  /**
   * Alert message
   */
  message: string;

  /**
   * Alert title
   */
  title?: string;

  /**
   * Visual variant of the alert
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Custom background color
   */
  backgroundColor?: string;

  /**
   * Custom text color
   */
  textColor?: string;

  /**
   * Custom border color
   */
  borderColor?: string;

  /**
   * Whether to show an icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Custom styles for the alert container
   */
  style?: ViewStyle;
}

const VARIANT_CONFIG = {
  info: {
    icon: { name: "information-circle", library: "Ionicons" },
    colors: {
      background: "#E3F2FD",
      text: "#0D47A1",
      border: "#90CAF9",
    },
  },
  success: {
    icon: { name: "checkmark-circle", library: "Ionicons" },
    colors: {
      background: "#E8F5E9",
      text: "#1B5E20",
      border: "#A5D6A7",
    },
  },
  warning: {
    icon: { name: "warning", library: "Ionicons" },
    colors: {
      background: "#FFF3E0",
      text: "#E65100",
      border: "#FFB74D",
    },
  },
  error: {
    icon: { name: "alert-circle", library: "Ionicons" },
    colors: {
      background: "#FFEBEE",
      text: "#B71C1C",
      border: "#EF9A9A",
    },
  },
};

/**
 * A customizable alert component with different variants and styling options.
 * 
 * ## Features
 * - **4 Built-in Variants**: info, success, warning, error with appropriate colors and icons
 * - **Custom Styling**: Override colors, borders, and background
 * - **Optional Icon**: Show/hide the variant-specific icon
 * - **Flexible Layout**: Title and message with proper spacing
 * - **Type Safety**: TypeScript validates variant types and props
 * 
 * ## Variants
 * - `info` - Blue theme with information icon
 * - `success` - Green theme with checkmark icon  
 * - `warning` - Orange theme with warning icon
 * - `error` - Red theme with alert icon
 *
 * @example
 * ```tsx
 * // Basic usage with variant
 * <AlertComponent
 *   variant="info"
 *   title="Information"
 *   message="This is an info alert with title and message"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Success alert without title
 * <AlertComponent
 *   variant="success"
 *   message="Your changes have been saved successfully!"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styled warning alert
 * <AlertComponent
 *   variant="warning"
 *   title="Attention Required"
 *   message="Please review your changes before proceeding"
 *   backgroundColor="#FFF8E1"
 *   textColor="#E65100"
 *   borderColor="#FFB74D"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Error alert with custom styling
 * <AlertComponent
 *   variant="error"
 *   title="Error"
 *   message="Something went wrong. Please try again."
 *   backgroundColor="#FFEBEE"
 *   textColor="#B71C1C"
 *   borderColor="#EF9A9A"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Alert without icon for custom designs
 * <AlertComponent
 *   variant="info"
 *   title="Custom Design"
 *   message="This alert has no icon for a cleaner look"
 *   showIcon={false}
 *   style={{ borderRadius: 12, marginHorizontal: 16 }}
 * />
 * ```
 */
export default function AlertComponent({
  message,
  title,
  variant = "info",
  backgroundColor,
  textColor,
  borderColor,
  showIcon = true,
  style,
}: AlertComponentProps) {
  const config = VARIANT_CONFIG[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor || config.colors.background,
          borderColor: borderColor || config.colors.border,
        },
        style,
      ]}
    >
      {showIcon && (
        <View style={styles.iconContainer}>
          <IconComponent
            {...(config.icon as any)}
            color={textColor || config.colors.text}
            size={24}
          />
        </View>
      )}
      <View style={styles.content}>
        {title && (
          <TextComponent
            weight="bold"
            color={textColor || config.colors.text}
            style={styles.title}
          >
            {title}
          </TextComponent>
        )}
        <TextComponent color={textColor || config.colors.text}>
          {message}
        </TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 8,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
});
