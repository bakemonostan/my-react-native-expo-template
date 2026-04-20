import { useTheme } from "@/context/ThemeContext";
import { mScale } from "@/constants/mixins";
import React, { useCallback } from "react";
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

export interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  trackHeight?: number;
  thumbSize?: number;
  /** Track background — defaults to theme border color */
  trackColor?: string;
  /** Thumb fill — defaults to theme surface */
  thumbColor?: string;
  /** Filled portion — defaults to theme primary */
  progressColor?: string;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  style?: StyleProp<ViewStyle>;
}

/** Default label when `showValue` is true and no `valueFormatter` is passed. */
function formatSliderValueLabel(
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
 * Single-thumb slider: drag to pick one value between `minimumValue` and `maximumValue`.
 *
 * Built with **Reanimated** + **react-native-gesture-handler**. Defaults use
 * {@link useTheme} (`border` / `surface` / `primary`); override with `trackColor`,
 * `thumbColor`, and `progressColor` when needed.
 *
 * @example Default theme (0–1, e.g. volume)
 * ```tsx
 * const [v, setV] = useState(0.5);
 * <CustomSlider
 *   value={v}
 *   onValueChange={setV}
 *   minimumValue={0}
 *   maximumValue={1}
 * />
 * ```
 *
 * @example 0–100 with floating label
 * ```tsx
 * const [brightness, setBrightness] = useState(72);
 * <CustomSlider
 *   value={brightness}
 *   onValueChange={setBrightness}
 *   minimumValue={0}
 *   maximumValue={100}
 *   showValue
 *   valueFormatter={(n) => `${Math.round(n)}%`}
 *   progressColor={colors.warning}
 * />
 * ```
 *
 * @example Custom track height and thumb size
 * ```tsx
 * <CustomSlider
 *   value={price}
 *   onValueChange={setPrice}
 *   minimumValue={0}
 *   maximumValue={500}
 *   trackHeight={10}
 *   thumbSize={28}
 * />
 * ```
 */
export function CustomSlider({
  value,
  onValueChange,
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
}: CustomSliderProps) {
  const { colors } = useTheme();
  const trackColor = trackColorProp ?? colors.border;
  const thumbColor = thumbColorProp ?? colors.surface;
  const progressColor = progressColorProp ?? colors.primary;

  const translateX = useSharedValue(0);
  const offset = useSharedValue(0);
  const sliderWidth = useSharedValue(0);

  const updateValue = useCallback(
    (translateXValue: number) => {
      const w = sliderWidth.value;
      if (w <= 0) return;
      const percentage = Math.max(0, Math.min(1, translateXValue / w));
      const newValue =
        minimumValue + percentage * (maximumValue - minimumValue);
      onValueChange(newValue);
    },
    [minimumValue, maximumValue, onValueChange, sliderWidth]
  );

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offset.value = translateX.value;
    })
    .onUpdate((event) => {
      const w = sliderWidth.value;
      const newTranslateX = Math.max(
        0,
        Math.min(w, event.translationX + offset.value)
      );
      translateX.value = newTranslateX;
      runOnJS(updateValue)(newTranslateX);
    })
    .onEnd(() => {
      offset.value = translateX.value;
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedProgressStyle = useAnimatedStyle(() => {
    const w = sliderWidth.value;
    if (w <= 0) return { width: "0%" };
    const progressWidth = (translateX.value / w) * 100;
    return { width: `${progressWidth}%` };
  });

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width } = event.nativeEvent.layout;
      const inner = width - thumbSize;
      sliderWidth.value = inner;
      const pct = (value - minimumValue) / (maximumValue - minimumValue);
      const x = Math.max(0, Math.min(inner, pct * inner));
      translateX.value = x;
      offset.value = x;
    },
    [thumbSize, value, minimumValue, maximumValue, sliderWidth, translateX, offset]
  );

  const trackShellH = Math.max(thumbSize, mScale(40));
  const trackTop = (trackShellH - trackHeight) / 2;
  const thumbTop = (trackShellH - thumbSize) / 2;

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {showValue && (
        <View style={styles.valueLabelArea} pointerEvents="none">
          <Animated.View style={[styles.valueContainer, animatedThumbStyle]}>
            <TextComponent
              size="sm"
              weight="medium"
              color={colors.primary}
              textAlign="center"
              style={styles.valueText}
            >
              {valueFormatter
                ? valueFormatter(value)
                : formatSliderValueLabel(value, minimumValue, maximumValue)}
            </TextComponent>
          </Animated.View>
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
            animatedProgressStyle,
          ]}
        />
        <GestureDetector gesture={panGesture}>
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
              animatedThumbStyle,
            ]}
          />
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  valueLabelArea: {
    height: mScale(22),
    marginBottom: mScale(6),
    position: "relative",
  },
  valueContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    minWidth: mScale(36),
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
  valueText: {
    width: "100%",
  },
});
