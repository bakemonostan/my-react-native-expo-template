import { useTheme } from "@/hooks/useTheme";
import { mScale } from "@/constants/mixins";
import React from "react";
import { StyleSheet, View } from "react-native";
import PressableComponent from "./PressableComponent";
import TextComponent from "./TextComponent";

/**
 * Centered error message with optional **`title`**, optional **`onRetry`** (outline button), and theme-aware text.
 * Used by **`StateHandler`** when a request fails and no **`errorRenderer`** is provided.
 *
 * @example Inline error
 * ```tsx
 * import ErrorState from "@/components/ui/ErrorState";
 *
 * <ErrorState message="Could not load data" onRetry={() => refetch()} />
 * ```
 *
 * @example Full-screen with title
 * ```tsx
 * <ErrorState
 *   title="Offline"
 *   message="Check your connection."
 *   fullScreen
 *   onRetry={() => {}}
 * />
 * ```
 */
export interface ErrorStateProps {
  /** Optional heading above the message */
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  /** Fills parent; uses theme background when true */
  fullScreen?: boolean;
  children?: React.ReactNode;
}

export default function ErrorState({
  title,
  message = "Something went wrong",
  onRetry,
  retryLabel = "Try again",
  isRetrying = false,
  fullScreen = false,
  children,
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        fullScreen && { backgroundColor: colors.background },
      ]}>
      {title ? (
        <TextComponent variant="h5" color={colors.error} textAlign="center">
          {title}
        </TextComponent>
      ) : null}
      {message ? (
        <TextComponent
          variant="body1Regular"
          color={colors.textSecondary}
          textAlign="center">
          {message}
        </TextComponent>
      ) : null}
      {onRetry ? <View style={{ height: mScale(12) }} /> : null}
      {onRetry ? (
        <PressableComponent
          buttonText={retryLabel}
          variant="outline"
          onPress={onRetry}
          loading={isRetrying}
        />
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: mScale(16),
    paddingVertical: mScale(12),
    gap: mScale(8),
  },
});
