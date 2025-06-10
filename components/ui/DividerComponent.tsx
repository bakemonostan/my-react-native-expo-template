import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface DividerComponentProps {
  /**
   * Color of the divider
   * @default '#E1E1E1'
   */
  color?: string;

  /**
   * Thickness of the divider
   * @default 1
   */
  thickness?: number;

  /**
   * Spacing around the divider
   * @default 16
   */
  spacing?: number;

  /**
   * Whether the divider is vertical
   * @default false
   */
  vertical?: boolean;

  /**
   * Custom styles for the divider
   */
  style?: ViewStyle;
}

/**
 * A simple divider component for visual separation
 *
 * @example
 * ```tsx
 * <DividerComponent />
 * ```
 *
 * @example
 * ```tsx
 * <DividerComponent
 *   color="#007AFF"
 *   thickness={2}
 *   spacing={24}
 *   vertical={true}
 * />
 * ```
 */
export default function DividerComponent({
  color = "#E1E1E1",
  thickness = 1,
  spacing = 16,
  vertical = false,
  style,
}: DividerComponentProps) {
  const dividerStyle = [
    styles.divider,
    {
      backgroundColor: color,
      [vertical ? "width" : "height"]: thickness,
      margin: spacing,
    },
    vertical && styles.vertical,
    style,
  ];

  return <View style={dividerStyle} />;
}

const styles = StyleSheet.create({
  divider: {
    flex: 1,
  },
  vertical: {
    height: "100%",
    width: 1,
  },
});
