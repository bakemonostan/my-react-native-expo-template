import type { AppColors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  ColorValue,
  Platform,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

import {
  $inputOuterBase,
  BaseToggleInputProps,
  Toggle,
  ToggleProps,
} from "./Toggle";

const isRTL = false;

type SwitchPaint = Pick<
  AppColors,
  | "primary"
  | "border"
  | "error"
  | "errorBackground"
  | "backgroundSecondary"
  | "textSecondary"
>;

/**
 * iOS-style switch on `Toggle`: track, knob, optional **`accessibilityMode`** (`"text"` | `"icon"`).
 *
 * @example Basic switch
 * ```tsx
 * import { Switch } from "@/components/Toggle";
 * import { useState } from "react";
 *
 * export function Demo() {
 *   const [on, setOn] = useState(true);
 *   return (
 *     <Switch value={on} onValueChange={setOn} label="Notifications" />
 *   );
 * }
 * ```
 *
 * @example With accessibility labels on the knob area
 * ```tsx
 * <Switch
 *   value={on}
 *   onValueChange={setOn}
 *   accessibilityMode="text"
 *   label="Airplane mode"
 * />
 * ```
 */
export interface SwitchToggleProps
  extends Omit<ToggleProps<SwitchInputProps>, "ToggleInput"> {
  accessibilityMode?: "text" | "icon";
  inputDetailStyle?: Omit<ViewStyle, "width" | "height"> & {
    width?: number;
    height?: number;
  };
}

interface SwitchInputProps extends BaseToggleInputProps<SwitchToggleProps> {
  accessibilityMode?: SwitchToggleProps["accessibilityMode"];
}

/** @see SwitchToggleProps */
export function Switch(props: SwitchToggleProps) {
  const { accessibilityMode, ...rest } = props;
  const switchInput = useCallback(
    (toggleProps: SwitchInputProps) => (
      <SwitchInput
        {...toggleProps}
        accessibilityMode={accessibilityMode}
      />
    ),
    [accessibilityMode],
  );
  return (
    <Toggle
      accessibilityRole="switch"
      {...rest}
      ToggleInput={switchInput}
    />
  );
}

function resolveKnobColor(
  on: boolean,
  disabled: boolean,
  status: SwitchInputProps["status"],
  $detailStyleOverride: ViewStyle | undefined,
  $innerStyleOverride: ViewStyle | undefined,
  paint: SwitchPaint,
): string {
  if (on) {
    const custom = $detailStyleOverride?.backgroundColor;
    if (typeof custom === "string") return custom;
    if (disabled) return paint.textSecondary;
    if (status === "error") return paint.error;
    return paint.backgroundSecondary;
  }
  const custom = $innerStyleOverride?.backgroundColor;
  if (typeof custom === "string") return custom;
  if (disabled) return paint.textSecondary;
  if (status === "error") return paint.error;
  return paint.border;
}

function SwitchInput(props: SwitchInputProps) {
  const {
    on,
    status,
    disabled,
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props;

  const { colors } = useTheme();
  const paint: SwitchPaint = {
    primary: colors.primary,
    border: colors.border,
    error: colors.error,
    errorBackground: colors.errorBackground,
    backgroundSecondary: colors.backgroundSecondary,
    textSecondary: colors.textSecondary,
  };

  const animate = useRef(new Animated.Value(on ? 1 : 0));
  const opacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animate.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [on]);

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [on]);

  const knobSizeFallback = 2;

  const knobWidth = [
    ($detailStyleOverride as ViewStyle)?.width,
    $switchDetail?.width,
    knobSizeFallback,
  ].find((v) => typeof v === "number");

  const knobHeight = [
    ($detailStyleOverride as ViewStyle)?.height,
    $switchDetail?.height,
    knobSizeFallback,
  ].find((v) => typeof v === "number");

  const offBackgroundColor = disabled
    ? colors.textDim
    : status === "error"
      ? colors.errorBackground
      : colors.border;

  const onBackgroundColor = disabled
    ? "transparent"
    : status === "error"
      ? colors.errorBackground
      : colors.primary;

  const knobBackgroundColor = resolveKnobColor(
    on,
    !!disabled,
    status,
    $detailStyleOverride as ViewStyle | undefined,
    $innerStyleOverride as ViewStyle | undefined,
    paint,
  );

  const rtlAdjustment = isRTL ? -1 : 1;
  const $themedSwitchInner = useMemo(() => [$toggleInner, $switchInner], []);

  const offsetLeft = ($innerStyleOverride?.paddingStart ||
    $innerStyleOverride?.paddingLeft ||
    ($themedSwitchInner[1] as ViewStyle)?.paddingStart ||
    ($themedSwitchInner[1] as ViewStyle)?.paddingLeft ||
    0) as number;

  const offsetRight = ($innerStyleOverride?.paddingEnd ||
    $innerStyleOverride?.paddingRight ||
    ($themedSwitchInner[1] as ViewStyle)?.paddingEnd ||
    ($themedSwitchInner[1] as ViewStyle)?.paddingRight ||
    0) as number;

  const outputRange =
    Platform.OS === "web"
      ? isRTL
        ? [+(knobWidth || 0) + offsetRight, offsetLeft]
        : [offsetLeft, +(knobWidth || 0) + offsetRight]
      : [
          rtlAdjustment * offsetLeft,
          rtlAdjustment * (+(knobWidth || 0) + offsetRight),
        ];

  const $animatedSwitchKnob = animate.current.interpolate({
    inputRange: [0, 1],
    outputRange,
  });

  return (
    <View
      style={[
        $inputOuter,
        { backgroundColor: offBackgroundColor as ColorValue },
        $outerStyleOverride,
      ]}>
      <Animated.View
        style={[
          ...$themedSwitchInner,
          { backgroundColor: onBackgroundColor as ColorValue },
          $innerStyleOverride,
          { opacity: opacity.current },
        ]}
      />

      <SwitchAccessibilityLabel
        {...props}
        role="on"
      />
      <SwitchAccessibilityLabel
        {...props}
        role="off"
      />

      <Animated.View
        style={[
          $switchDetail,
          $detailStyleOverride,
          { transform: [{ translateX: $animatedSwitchKnob }] },
          { width: knobWidth, height: knobHeight },
          { backgroundColor: knobBackgroundColor as ColorValue },
        ]}
      />
    </View>
  );
}

function SwitchAccessibilityLabel(
  props: SwitchInputProps & { role: "on" | "off" },
) {
  const {
    on,
    disabled,
    status,
    accessibilityMode,
    role,
    innerStyle,
    detailStyle,
  } = props;

  const { colors } = useTheme();

  if (!accessibilityMode) return null;

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off");

  const $switchAccessibilityStyle: StyleProp<ViewStyle> = [
    $switchAccessibility,
    role === "off" && { end: "5%" },
    role === "on" && { left: "5%" },
  ];

  let color: ColorValue = colors.backgroundSecondary;
  if (disabled) color = colors.textSecondary;
  else if (status === "error") color = colors.error;
  else if (!on) {
    const c = (innerStyle as ViewStyle)?.backgroundColor;
    color = (c != null ? String(c) : colors.primary) as ColorValue;
  } else {
    const c = (detailStyle as ViewStyle)?.backgroundColor;
    color = (c != null ? String(c) : colors.backgroundSecondary) as ColorValue;
  }

  return (
    <View style={$switchAccessibilityStyle}>
      {accessibilityMode === "text" && shouldLabelBeVisible && (
        <View
          style={[
            role === "on" && $switchAccessibilityLine,
            role === "on" && { backgroundColor: color },
            role === "off" && $switchAccessibilityCircle,
            role === "off" && { borderColor: color },
          ]}
        />
      )}

      {accessibilityMode === "icon" && shouldLabelBeVisible && (
        <View style={[$switchAccessibilityIcon, { backgroundColor: color }]} />
      )}
    </View>
  );
}

const $toggleInner: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: 16,
};

const $inputOuter: StyleProp<ViewStyle> = [
  $inputOuterBase,
  { height: 32, width: 56, borderRadius: 16, borderWidth: 0 },
];

const $switchInner: ViewStyle = {
  borderColor: "transparent",
  position: "absolute",
  paddingStart: 4,
  paddingEnd: 4,
};

const $switchDetail: SwitchToggleProps["inputDetailStyle"] = {
  borderRadius: 12,
  position: "absolute",
  width: 24,
  height: 24,
};

const $switchAccessibility: ViewStyle = {
  width: "40%",
  justifyContent: "center",
  alignItems: "center",
};

const $switchAccessibilityIcon: ViewStyle = {
  width: 14,
  height: 14,
};

const $switchAccessibilityLine: ViewStyle = {
  width: 2,
  height: 12,
};

const $switchAccessibilityCircle: ViewStyle = {
  borderWidth: 2,
  width: 12,
  height: 12,
  borderRadius: 6,
};
