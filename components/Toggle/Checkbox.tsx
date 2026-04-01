import { useCallback, useEffect, useRef } from "react";
import { Animated, ImageStyle, StyleProp, View, ViewStyle } from "react-native";

import {
  $inputOuterBase,
  BaseToggleInputProps,
  Toggle,
  ToggleProps,
} from "./Toggle";

// Simple icon registry for checkbox
const iconRegistry = {
  check:
    require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json")
      ? { uri: "checkmark" }
      : require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/Ionicons.json"),
};

type IconTypes = "check";

export interface CheckboxToggleProps
  extends Omit<ToggleProps<CheckboxInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the Image component.
   */
  inputDetailStyle?: ImageStyle;
  /**
   * Checkbox-only prop that changes the icon used for the "on" state.
   */
  icon?: IconTypes;
}

interface CheckboxInputProps extends BaseToggleInputProps<CheckboxToggleProps> {
  icon?: CheckboxToggleProps["icon"];
}
/**
 * @param {CheckboxToggleProps} props - The props for the `Checkbox` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Checkbox}
 * @returns {JSX.Element} The rendered `Checkbox` component.
 */
export function Checkbox(props: CheckboxToggleProps) {
  const { icon, ...rest } = props;
  const checkboxInput = useCallback(
    (toggleProps: CheckboxInputProps) => (
      <CheckboxInput
        {...toggleProps}
        icon={icon}
      />
    ),
    [icon]
  );
  return (
    <Toggle
      accessibilityRole="checkbox"
      {...rest}
      ToggleInput={checkboxInput}
    />
  );
}

function CheckboxInput(props: CheckboxInputProps) {
  const {
    on,
    status,
    disabled,
    icon = "check",
    outerStyle: $outerStyleOverride,
    innerStyle: $innerStyleOverride,
    detailStyle: $detailStyleOverride,
  } = props;

  const opacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [on]);

  const offBackgroundColor = [
    disabled && "#9CA3AF",
    status === "error" && "#FEE2E2",
    "#E5E7EB",
  ].filter(Boolean)[0];

  const outerBorderColor = [
    disabled && "#9CA3AF",
    status === "error" && "#DC2626",
    !on && "#1F2937",
    "#3B82F6",
  ].filter(Boolean)[0];

  const onBackgroundColor = [
    disabled && "transparent",
    status === "error" && "#FEE2E2",
    "#3B82F6",
  ].filter(Boolean)[0];

  const iconTintColor = [
    disabled && "#6B7280",
    status === "error" && "#DC2626",
    "#FFFFFF",
  ].filter(Boolean)[0];

  return (
    <View
      style={[
        $inputOuter,
        { backgroundColor: offBackgroundColor, borderColor: outerBorderColor },
        $outerStyleOverride,
      ]}>
      <Animated.View
        style={[
          $toggleInner,
          { backgroundColor: onBackgroundColor },
          $innerStyleOverride,
          { opacity: opacity.current },
        ]}>
        <View
          style={[
            $checkboxDetail,
            !!iconTintColor && { backgroundColor: iconTintColor },
            $detailStyleOverride as ViewStyle,
          ]}
        />
      </Animated.View>
    </View>
  );
}

const $toggleInner: ViewStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  borderRadius: 4,
  alignItems: "center",
  justifyContent: "center",
};

const $checkboxDetail: ViewStyle = {
  width: 12,
  height: 12,
};

const $inputOuter: StyleProp<ViewStyle> = [
  $inputOuterBase,
  { borderRadius: 4 },
];
