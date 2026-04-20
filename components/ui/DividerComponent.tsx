import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export interface DividerComponentProps {
  /**
   * Color of the divider
   * @default theme `colors.separator`
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
 * A simple divider component for visual separation between content sections.
 * 
 * ## Features
 * - **Horizontal & Vertical**: Support for both orientations
 * - **Custom Styling**: Color, thickness, and spacing control
 * - **Flexible Layout**: Works in any container with proper spacing
 * - **Type Safety**: TypeScript validates all styling props
 * - **Performance Optimized**: Lightweight component with minimal overhead
 * 
 * ## Orientation Modes
 * - **Horizontal**: Default mode for separating content vertically
 * - **Vertical**: For separating content horizontally (requires container with height)
 *
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <DividerComponent />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styled horizontal divider
 * <DividerComponent
 *   color="#007AFF"
 *   thickness={2}
 *   spacing={24}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Vertical divider in a row layout
 * <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
 *   <Text>Left Content</Text>
 *   <DividerComponent
 *     vertical={true}
 *     color="#E1E1E1"
 *     thickness={1}
 *     spacing={16}
 *   />
 *   <Text>Right Content</Text>
 * </View>
 * ```
 *
 * @example
 * ```tsx
 * // Thick colored divider
 * <DividerComponent
 *   color="#FF3B30"
 *   thickness={3}
 *   spacing={32}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Minimal spacing divider
 * <DividerComponent
 *   color="#CCCCCC"
 *   thickness={1}
 *   spacing={8}
 * />
 * ```
 */
export default function DividerComponent({
  color,
  thickness = 1,
  spacing = 16,
  vertical = false,
  style,
}: DividerComponentProps) {
  const { colors } = useTheme();
  const lineColor = color ?? colors.separator;

  const dividerStyle = [
    styles.divider,
    {
      backgroundColor: lineColor,
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
