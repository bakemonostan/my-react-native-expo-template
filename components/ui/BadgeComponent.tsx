import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import TextComponent from "./TextComponent";

export interface BadgeComponentProps {
  /**
   * Content to display in the badge
   */
  content?: string | number;

  /**
   * Background color of the badge
   * @default **`colors.error`**
   */
  backgroundColor?: string;

  /**
   * Text color of the badge
   * @default **`colors.primaryText`**
   */
  textColor?: string;

  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";

  /**
   * Custom styles for the badge container
   */
  style?: ViewStyle;

  /**
   * Whether to show the badge as a dot (no content)
   * @default false
   */
  dot?: boolean;
}

/**
 * A badge component for notifications and status indicators.
 * 
 * ## Features
 * - **Multiple Sizes**: small, medium, large with proportional scaling
 * - **Dot Mode**: Show as a simple dot without text content
 * - **Custom Colors**: Override background and text colors
 * - **Flexible Content**: Display numbers, text, or just a dot
 * - **Responsive Design**: Automatically adjusts padding and font size
 * - **Type Safety**: TypeScript validates all props and content types
 * 
 * ## Size Variants
 * - `small` - 16px height (dot: 8px)
 * - `medium` - 20px height (dot: 10px) 
 * - `large` - 24px height (dot: 12px)
 *
 * @example
 * ```tsx
 * // Basic notification badge
 * <BadgeComponent content="5" />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styled badge
 * <BadgeComponent
 *   content="New"
 *   backgroundColor="#4CD964"
 *   textColor="#FFFFFF"
 *   size="large"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Small dot indicator
 * <BadgeComponent
 *   dot={true}
 *   size="small"
 *   backgroundColor="#FF3B30"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Large badge with custom styling
 * <BadgeComponent
 *   content="99+"
 *   size="large"
 *   backgroundColor="#007AFF"
 *   textColor="#FFFFFF"
 *   style={{ marginLeft: 8 }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Medium badge with number
 * <BadgeComponent
 *   content={42}
 *   size="medium"
 *   backgroundColor="#FF9500"
 *   textColor="#FFFFFF"
 * />
 * ```
 */
export default function BadgeComponent({
  content,
  backgroundColor,
  textColor,
  size = "medium",
  style,
  dot = false,
}: BadgeComponentProps) {
  const { colors } = useTheme();
  const bg = backgroundColor ?? colors.error;
  const fg = textColor ?? colors.primaryText;

  const getSize = () => {
    switch (size) {
      case "small":
        return dot ? 8 : 16;
      case "large":
        return dot ? 12 : 24;
      default:
        return dot ? 10 : 20;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return 10;
      case "large":
        return 14;
      default:
        return 12;
    }
  };

  const badgeSize = getSize();
  const fontSize = getFontSize();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: bg,
      width: dot ? badgeSize : undefined,
      height: badgeSize,
      minWidth: dot ? badgeSize : badgeSize * 1.5,
      borderRadius: badgeSize / 2,
    },
    style,
  ];

  if (dot) {
    return <View style={containerStyle} />;
  }

  return (
    <View style={containerStyle}>
      <TextComponent
        style={styles.text}
        color={fg}
        size={fontSize}
        weight="semi_bold"
      >
        {content}
      </TextComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  text: {
    textAlign: "center",
  },
});
