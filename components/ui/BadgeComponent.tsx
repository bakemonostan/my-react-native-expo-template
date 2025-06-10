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
   * @default '#FF3B30'
   */
  backgroundColor?: string;

  /**
   * Text color of the badge
   * @default '#FFFFFF'
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
 * A badge component for notifications and status indicators
 *
 * @example
 * ```tsx
 * <BadgeComponent content="5" />
 * ```
 *
 * @example
 * ```tsx
 * <BadgeComponent
 *   content="New"
 *   backgroundColor="#4CD964"
 *   size="large"
 *   dot={false}
 * />
 * ```
 */
export default function BadgeComponent({
  content,
  backgroundColor = "#FF3B30",
  textColor = "#FFFFFF",
  size = "medium",
  style,
  dot = false,
}: BadgeComponentProps) {
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
      backgroundColor,
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
        color={textColor}
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
