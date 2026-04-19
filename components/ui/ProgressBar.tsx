import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import TextComponent from "./TextComponent";

export interface ProgressBarProps {
  /**
   * Progress value between 0 and 1 (e.g. 0.5 = 50%).
   * Pass `undefined` or omit for indeterminate mode.
   */
  progress?: number;

  /**
   * Height of the track bar.
   * @default 8
   */
  height?: number;

  /**
   * Color of the filled portion.
   * Defaults to `colors.primary`.
   */
  color?: string;

  /**
   * Color of the unfilled track.
   * Defaults to `colors.backgroundSecondary`.
   */
  trackColor?: string;

  /**
   * Whether to show the percentage label to the right.
   * Only shown in determinate mode.
   * @default false
   */
  showLabel?: boolean;

  /**
   * Border radius of the bar.
   * @default 99 (fully rounded)
   */
  borderRadius?: number;

  /**
   * Whether to animate progress changes.
   * @default true
   */
  animated?: boolean;

  /**
   * Container style override.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * A determinate or indeterminate progress bar — fully theme-aware.
 *
 * @example Determinate (upload progress)
 * ```tsx
 * <ProgressBar progress={uploadProgress} showLabel />
 * ```
 *
 * @example Indeterminate (loading state)
 * ```tsx
 * <ProgressBar />
 * ```
 *
 * @example Custom colour + height
 * ```tsx
 * <ProgressBar progress={0.72} height={12} color={colors.success} />
 * ```
 *
 * @example Onboarding steps (3 of 5)
 * ```tsx
 * <ProgressBar progress={3 / 5} showLabel height={6} />
 * ```
 */
export default function ProgressBar({
  progress,
  height = 8,
  color,
  trackColor,
  showLabel = false,
  borderRadius = 99,
  animated = true,
  style,
}: ProgressBarProps) {
  const { colors } = useTheme();
  const fillColor = color ?? colors.primary;

  const widthAnim = useRef(new Animated.Value(0)).current;
  const indeterminateAnim = useRef(new Animated.Value(-1)).current;
  const isIndeterminate = progress === undefined;

  useEffect(() => {
    if (isIndeterminate) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(indeterminateAnim, {
            toValue: -1,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      const clamped = Math.min(Math.max(progress, 0), 1);
      if (animated) {
        Animated.timing(widthAnim, {
          toValue: clamped,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        widthAnim.setValue(clamped);
      }
    }
  }, [progress, isIndeterminate, animated, widthAnim, indeterminateAnim]);

  const track = trackColor ?? colors.backgroundSecondary;
  // fillColor declared above — avoids reference before declaration

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.track,
          { height, borderRadius, backgroundColor: track },
        ]}
      >
        {isIndeterminate ? (
          <Animated.View
            style={[
              styles.indeterminate,
              {
                height,
                borderRadius,
                backgroundColor: fillColor,
                transform: [
                  {
                    translateX: indeterminateAnim.interpolate({
                      inputRange: [-1, 1],
                      outputRange: ["-100%", "100%"],
                    }),
                  },
                ],
              },
            ]}
          />
        ) : (
          <Animated.View
            style={{
              height,
              borderRadius,
              backgroundColor: fillColor,
              width: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        )}
      </View>

      {showLabel && !isIndeterminate && (
        <TextComponent
          size="xs"
          weight="medium"
          color={colors.textSecondary}
          style={styles.label}
        >
          {Math.round((progress ?? 0) * 100)}%
        </TextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  track: {
    flex: 1,
    overflow: "hidden",
  },
  indeterminate: {
    width: "40%",
    position: "absolute",
  },
  label: {
    minWidth: 36,
    textAlign: "right",
  },
});
