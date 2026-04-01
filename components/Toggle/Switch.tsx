import { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Platform, StyleProp, View, ViewStyle } from "react-native";

import {
  $inputOuterBase,
  BaseToggleInputProps,
  Toggle,
  ToggleProps,
} from "./Toggle";

// Simple RTL detection
const isRTL = false; // You can replace this with your own RTL detection logic

// Icon registry for switch accessibility icons
const iconRegistry = {
  hidden:
    require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json")
      ? { uri: "eye-off" }
      : require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json"),
  view: require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json")
    ? { uri: "eye" }
    : require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json"),
};

export interface SwitchToggleProps
  extends Omit<ToggleProps<SwitchInputProps>, "ToggleInput"> {
  /**
   * Switch-only prop that adds a text/icon label for on/off states.
   */
  accessibilityMode?: "text" | "icon";
  /**
   * Optional style prop that affects the knob View.
   * Note: `width` and `height` rules should be points (numbers), not percentages.
   */
  inputDetailStyle?: Omit<ViewStyle, "width" | "height"> & {
    width?: number;
    height?: number;
  };
}

interface SwitchInputProps extends BaseToggleInputProps<SwitchToggleProps> {
  accessibilityMode?: SwitchToggleProps["accessibilityMode"];
}

/**
 * @param {SwitchToggleProps} props - The props for the `Switch` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Switch}
 * @returns {JSX.Element} The rendered `Switch` component.
 */
export function Switch(props: SwitchToggleProps) {
  const { accessibilityMode, ...rest } = props;
  const switchInput = useCallback(
    (toggleProps: SwitchInputProps) => (
      <SwitchInput
        {...toggleProps}
        accessibilityMode={accessibilityMode}
      />
    ),
    [accessibilityMode]
  );
  return (
    <Toggle
      accessibilityRole="switch"
      {...rest}
      ToggleInput={switchInput}
    />
  );
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
    $detailStyleOverride?.width,
    $switchDetail?.width,
    knobSizeFallback,
  ].find((v) => typeof v === "number");

  const knobHeight = [
    $detailStyleOverride?.height,
    $switchDetail?.height,
    knobSizeFallback,
  ].find((v) => typeof v === "number");

  const offBackgroundColor = [
    disabled && "#9CA3AF",
    status === "error" && "#FEE2E2",
    "#D1D5DB",
  ].filter(Boolean)[0];

  const onBackgroundColor = [
    disabled && "transparent",
    status === "error" && "#FEE2E2",
    "#3B82F6",
  ].filter(Boolean)[0];

  const knobBackgroundColor = (function () {
    if (on) {
      return [
        $detailStyleOverride?.backgroundColor,
        status === "error" && "#DC2626",
        disabled && "#6B7280",
        "#F3F4F6",
      ].filter(Boolean)[0];
    } else {
      return [
        $innerStyleOverride?.backgroundColor,
        disabled && "#6B7280",
        status === "error" && "#DC2626",
        "#E5E7EB",
      ].filter(Boolean)[0];
    }
  })();

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
        { backgroundColor: offBackgroundColor },
        $outerStyleOverride,
      ]}>
      <Animated.View
        style={[
          ...$themedSwitchInner,
          { backgroundColor: onBackgroundColor },
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
          { backgroundColor: knobBackgroundColor },
        ]}
      />
    </View>
  );
}

/**
 * @param {ToggleInputProps & { role: "on" | "off" }} props - The props for the `SwitchAccessibilityLabel` component.
 * @returns {JSX.Element} The rendered `SwitchAccessibilityLabel` component.
 */
function SwitchAccessibilityLabel(
  props: SwitchInputProps & { role: "on" | "off" }
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

  if (!accessibilityMode) return null;

  const shouldLabelBeVisible = (on && role === "on") || (!on && role === "off");

  const $switchAccessibilityStyle: StyleProp<ViewStyle> = [
    $switchAccessibility,
    role === "off" && { end: "5%" },
    role === "on" && { left: "5%" },
  ];

  const color = (function () {
    if (disabled) return "#6B7280";
    if (status === "error") return "#DC2626";
    if (!on) return (innerStyle as ViewStyle)?.backgroundColor || "#3B82F6";
    return (detailStyle as ViewStyle)?.backgroundColor || "#F3F4F6";
  })();

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
