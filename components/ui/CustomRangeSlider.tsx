import { useTheme } from "@/context/ThemeContext";
import { mScale } from "@/constants/mixins";
import React, { useCallback, useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import TextComponent from "./TextComponent";

export interface CustomRangeSliderProps {
  minValue: number;
  maxValue: number;
  onRangeChange: (minValue: number, maxValue: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  trackHeight?: number;
  thumbSize?: number;
  trackColor?: string;
  thumbColor?: string;
  progressColor?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  style?: StyleProp<ViewStyle>;
}

const MIN_SEPARATION_PCT = 0.05;

function formatRangeValueLabel(
  value: number,
  minimumValue: number,
  maximumValue: number
): string {
  const range = maximumValue - minimumValue;
  if (range <= 1) {
    return String(Math.round(value * 100) / 100);
  }
  return String(Math.round(value));
}

/**
 * Two-thumb **range** slider: drag each thumb to set a min and max within
 * `[minimumValue, maximumValue]`. Uses **Reanimated** + **gesture handler**;
 * theme defaults match {@link CustomSlider}.
 *
 * @example Price filter ($0–$100)
 * When `showValue` is true, a **single** summary line is shown above the track
 * (avoids overlapping labels when the thumbs are close).
 * ```tsx
 * const [min, setMin] = useState(20);
 * const [max, setMax] = useState(80);
 * <CustomRangeSlider
 *   minValue={min}
 *   maxValue={max}
 *   onRangeChange={(a, b) => {
 *     setMin(a);
 *     setMax(b);
 *   }}
 *   minimumValue={0}
 *   maximumValue={100}
 *   showValue
 *   valueFormatter={(v) => `$${Math.round(v)}`}
 * />
 * ```
 *
 * @example Normalized range (0–1)
 * ```tsx
 * <CustomRangeSlider
 *   minValue={0.2}
 *   maxValue={0.7}
 *   onRangeChange={(lo, hi) => setRange({ lo, hi })}
 *   minimumValue={0}
 *   maximumValue={1}
 * />
 * ```
 *
 * @example Custom colors
 * ```tsx
 * <CustomRangeSlider
 *   minValue={min}
 *   maxValue={max}
 *   onRangeChange={...}
 *   trackColor={colors.backgroundSecondary}
 *   progressColor={colors.primary}
 *   thumbColor={colors.surface}
 * />
 * ```
 */
export function CustomRangeSlider({
  minValue,
  maxValue,
  onRangeChange,
  minimumValue = 0,
  maximumValue = 1,
  trackHeight = mScale(8),
  thumbSize = mScale(24),
  trackColor: trackColorProp,
  thumbColor: thumbColorProp,
  progressColor: progressColorProp,
  showValue = false,
  valueFormatter,
  style,
}: CustomRangeSliderProps) {
  const { colors } = useTheme();
  const trackColor = trackColorProp ?? colors.border;
  const thumbColor = thumbColorProp ?? colors.surface;
  const progressColor = progressColorProp ?? colors.primary;

  const leftThumbX = useSharedValue(0);
  const rightThumbX = useSharedValue(0);
  const leftOffset = useSharedValue(0);
  const rightOffset = useSharedValue(0);
  const sliderWidth = useSharedValue(0);
  const activeThumb = useSharedValue<"left" | "right" | null>(null);
  const isInitialized = useSharedValue(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const getInitialPositions = useCallback(
    (width: number) => {
      const range = maximumValue - minimumValue;
      if (range <= 0 || width <= 0) {
        return { left: 0, right: width * 0.5 };
      }
      const minPos = ((minValue - minimumValue) / range) * width;
      const maxPos = ((maxValue - minimumValue) / range) * width;
      const minSeparation = width * MIN_SEPARATION_PCT;

      if (
        Math.abs(maxPos - minPos) < minSeparation ||
        Number.isNaN(minPos) ||
        Number.isNaN(maxPos)
      ) {
        return {
          left: width * 0.1,
          right: Math.min(width * 0.6, width - minSeparation),
        };
      }

      return {
        left: Math.max(0, minPos),
        right: Math.min(width, maxPos),
      };
    },
    [minValue, maxValue, minimumValue, maximumValue]
  );

  const updateRange = useCallback(
    (leftX: number, rightX: number) => {
      const w = sliderWidth.value;
      if (w <= 0) return;
      const leftPercentage = Math.max(0, Math.min(1, leftX / w));
      const rightPercentage = Math.max(0, Math.min(1, rightX / w));
      const newMin =
        minimumValue + leftPercentage * (maximumValue - minimumValue);
      const newMax =
        minimumValue + rightPercentage * (maximumValue - minimumValue);
      onRangeChange(newMin, newMax);
    },
    [minimumValue, maximumValue, onRangeChange, sliderWidth]
  );

  const leftPanGesture = Gesture.Pan()
    .onStart(() => {
      activeThumb.value = "left";
      leftOffset.value = leftThumbX.value;
    })
    .onUpdate((event) => {
      const w = sliderWidth.value;
      const minSep = w * MIN_SEPARATION_PCT;
      const newLeftX = Math.max(
        0,
        Math.min(rightThumbX.value - minSep, event.translationX + leftOffset.value)
      );
      leftThumbX.value = newLeftX;
      runOnJS(updateRange)(newLeftX, rightThumbX.value);
    })
    .onEnd(() => {
      leftOffset.value = leftThumbX.value;
      activeThumb.value = null;
    });

  const rightPanGesture = Gesture.Pan()
    .onStart(() => {
      activeThumb.value = "right";
      rightOffset.value = rightThumbX.value;
    })
    .onUpdate((event) => {
      const w = sliderWidth.value;
      const minSep = w * MIN_SEPARATION_PCT;
      const newRightX = Math.max(
        leftThumbX.value + minSep,
        Math.min(w, event.translationX + rightOffset.value)
      );
      rightThumbX.value = newRightX;
      runOnJS(updateRange)(leftThumbX.value, newRightX);
    })
    .onEnd(() => {
      rightOffset.value = rightThumbX.value;
      activeThumb.value = null;
    });

  const leftThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftThumbX.value }],
    opacity: isInitialized.value ? 1 : 0,
  }));

  const rightThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightThumbX.value }],
    opacity: isInitialized.value ? 1 : 0,
  }));

  const progressStyle = useAnimatedStyle(() => {
    const w = sliderWidth.value;
    if (w <= 0) return { left: "0%", width: "0%" };
    const leftPercentage = (leftThumbX.value / w) * 100;
    const rightPercentage = (rightThumbX.value / w) * 100;
    const widthPct = rightPercentage - leftPercentage;
    return {
      left: `${leftPercentage}%`,
      width: `${widthPct}%`,
    };
  });

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      const inner = width - thumbSize;
      sliderWidth.value = inner;
      const { left, right } = getInitialPositions(inner);
      leftThumbX.value = left;
      rightThumbX.value = right;
      leftOffset.value = left;
      rightOffset.value = right;
      isInitialized.value = true;
    },
    [thumbSize, getInitialPositions, sliderWidth, leftThumbX, rightThumbX, leftOffset, rightOffset, isInitialized]
  );

  const trackShellH = Math.max(thumbSize, mScale(48));
  const trackTop = (trackShellH - trackHeight) / 2;
  const thumbTop = (trackShellH - thumbSize) / 2;

  const minLabel = valueFormatter
    ? valueFormatter(minValue)
    : formatRangeValueLabel(minValue, minimumValue, maximumValue);
  const maxLabel = valueFormatter
    ? valueFormatter(maxValue)
    : formatRangeValueLabel(maxValue, minimumValue, maximumValue);

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {showValue && (
        <View style={styles.rangeValueRow} pointerEvents="none">
          <TextComponent
            size="sm"
            weight="medium"
            color={colors.primary}
            textAlign="center"
          >
            {minLabel} – {maxLabel}
          </TextComponent>
        </View>
      )}
      <View style={[styles.trackShell, { height: trackShellH }]}>
        <View
          style={[
            styles.track,
            {
              height: trackHeight,
              backgroundColor: trackColor,
              top: trackTop,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.progressTrack,
            {
              height: trackHeight,
              backgroundColor: progressColor,
              top: trackTop,
            },
            progressStyle,
          ]}
        />
        {mounted && (
          <>
            <GestureDetector gesture={leftPanGesture}>
              <Animated.View
                style={[
                  styles.thumb,
                  {
                    width: thumbSize,
                    height: thumbSize,
                    top: thumbTop,
                    backgroundColor: thumbColor,
                    borderRadius: thumbSize / 2,
                    borderWidth: StyleSheet.hairlineWidth * 2,
                    borderColor: progressColor,
                    shadowColor: colors.palette.black,
                  },
                  leftThumbStyle,
                ]}
              />
            </GestureDetector>
            <GestureDetector gesture={rightPanGesture}>
              <Animated.View
                style={[
                  styles.thumb,
                  {
                    width: thumbSize,
                    height: thumbSize,
                    top: thumbTop,
                    backgroundColor: thumbColor,
                    borderRadius: thumbSize / 2,
                    borderWidth: StyleSheet.hairlineWidth * 2,
                    borderColor: progressColor,
                    shadowColor: colors.palette.black,
                  },
                  rightThumbStyle,
                ]}
              />
            </GestureDetector>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  rangeValueRow: {
    minHeight: mScale(22),
    marginBottom: mScale(6),
    justifyContent: "center",
  },
  trackShell: {
    position: "relative",
    width: "100%",
  },
  track: {
    position: "absolute",
    width: "100%",
    borderRadius: mScale(4),
  },
  progressTrack: {
    position: "absolute",
    borderRadius: mScale(4),
  },
  thumb: {
    position: "absolute",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});
