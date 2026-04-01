import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";
import TextComponent from "./TextComponent";

export interface LoadingComponentProps {
  /**
   * Whether the loading indicator is visible
   * @default true
   */
  visible?: boolean;

  /**
   * Loading message to display
   */
  message?: string;

  /**
   * Size of the loading indicator
   * @default 'large'
   */
  size?: "small" | "large";

  /**
   * Color of the loading indicator
   * @default '#007AFF'
   */
  color?: string;

  /**
   * Custom styles for the container
   */
  style?: ViewStyle;

  /**
   * Whether to show the loading indicator in full screen
   * @default false
   */
  fullScreen?: boolean;
}

/**
 * A loading spinner component with optional message and flexible display options.
 * 
 * ## Features
 * - **Multiple Sizes**: small and large spinner sizes
 * - **Custom Colors**: Override default spinner color
 * - **Optional Message**: Display loading text below spinner
 * - **Full Screen Mode**: Overlay the entire screen with loading state
 * - **Visibility Control**: Show/hide loading state programmatically
 * - **Type Safety**: TypeScript validates all props and styling
 * 
 * ## Size Variants
 * - `small` - Compact spinner for inline loading
 * - `large` - Standard size for full loading states
 *
 * @example
 * ```tsx
 * // Basic loading with message
 * <LoadingComponent message="Loading..." />
 * ```
 *
 * @example
 * ```tsx
 * // Full screen loading overlay
 * <LoadingComponent
 *   visible={isLoading}
 *   size="large"
 *   color="#007AFF"
 *   fullScreen={true}
 *   message="Please wait while we load your data..."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Small inline loading
 * <LoadingComponent
 *   size="small"
 *   color="#FF9500"
 *   message="Saving..."
 *   style={{ padding: 8 }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Conditional loading with custom styling
 * <LoadingComponent
 *   visible={isLoading}
 *   size="large"
 *   color="#4CD964"
 *   message="Processing your request"
 *   style={{
 *     backgroundColor: 'rgba(255, 255, 255, 0.9)',
 *     borderRadius: 12,
 *     padding: 24
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Loading without message
 * <LoadingComponent
 *   size="small"
 *   color="#FF3B30"
 *   style={{ marginLeft: 8 }}
 * />
 * ```
 */
export default function LoadingComponent({
  visible = true,
  message,
  size = "large",
  color = "#007AFF",
  style,
  fullScreen = false,
}: LoadingComponentProps) {
  if (!visible) return null;

  const containerStyle = [
    styles.container,
    fullScreen && styles.fullScreen,
    style,
  ];

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {message && (
        <TextComponent style={styles.message} color="#666666" size="sm">
          {message}
        </TextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 999,
  },
  message: {
    marginTop: 12,
  },
});
