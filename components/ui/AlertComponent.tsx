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
 * A customizable alert component with different variants and styling options
 *
 * @example
 * ```tsx
 * // Basic usage with variant
 * <AlertComponent
 *   variant="info"
 *   title="Information"
 *   message="This is an info alert"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styled alert
 * <AlertComponent
 *   variant="success"
 *   message="Operation successful"
 *   backgroundColor="#E8F5E9"
 *   textColor="#2E7D32"
 *   borderColor="#A5D6A7"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Alert without icon
 * <AlertComponent
 *   variant="warning"
 *   title="Warning"
 *   message="Please review your changes"
 *   showIcon={false}
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
