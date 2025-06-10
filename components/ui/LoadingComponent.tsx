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
 * A loading spinner component with optional message
 *
 * @example
 * ```tsx
 * <LoadingComponent message="Loading..." />
 * ```
 *
 * @example
 * ```tsx
 * <LoadingComponent
 *   visible={isLoading}
 *   size="small"
 *   color="#FF0000"
 *   fullScreen={true}
 *   message="Please wait..."
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
