import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Props interface for the SafeAreaViewComponent
 */
interface SafeAreaViewComponentProps {
  /**
   * Content to be rendered inside the safe area
   */
  children: React.ReactNode;

  /**
   * Custom styles for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Which edges to apply safe area insets to
   * @default ['top', 'right', 'bottom', 'left']
   */
  edges?: ("top" | "right" | "bottom" | "left")[];

  /**
   * Whether to apply safe area insets
   * @default true
   */
  withEdges?: boolean;
}

/**
 * A wrapper component that handles safe area insets for different devices
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SafeAreaViewComponent>
 *   <Text>Content that respects safe areas</Text>
 * </SafeAreaViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Custom edges and styling
 * <SafeAreaViewComponent
 *   edges={['top', 'bottom']}
 *   style={{ backgroundColor: '#F5F5F5' }}
 * >
 *   <Text>Content with custom safe area edges</Text>
 * </SafeAreaViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Disable safe area handling
 * <SafeAreaViewComponent withEdges={false}>
 *   <Text>Content without safe area handling</Text>
 * </SafeAreaViewComponent>
 * ```
 */
export default function SafeAreaViewComponent({
  children,
  style,
  edges = ["top", "right", "bottom", "left"],
  withEdges = true,
}: SafeAreaViewComponentProps) {
  return (
    <SafeAreaView edges={withEdges ? edges : []} style={[{ flex: 1 }, style]}>
      {children}
    </SafeAreaView>
  );
}
