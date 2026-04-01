import { useEffect, useRef } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";

import {
  $inputOuterBase,
  BaseToggleInputProps,
  Toggle,
  ToggleProps,
} from "./Toggle";

export interface RadioToggleProps
  extends Omit<ToggleProps<RadioInputProps>, "ToggleInput"> {
  /**
   * Optional style prop that affects the dot View.
   */
  inputDetailStyle?: ViewStyle;
}

interface RadioInputProps extends BaseToggleInputProps<RadioToggleProps> {}

/**
 * @param {RadioToggleProps} props - The props for the `Radio` component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Radio}
 * @returns {JSX.Element} The rendered `Radio` component.
 */
export function Radio(props: RadioToggleProps) {
  return (
    <Toggle
      accessibilityRole="radio"
      {...props}
      ToggleInput={RadioInput}
    />
  );
}

function RadioInput(props: RadioInputProps) {
  const {
    on,
    status,
    disabled,
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
    "#F3F4F6",
  ].filter(Boolean)[0];

  const dotBackgroundColor = [
    disabled && "#6B7280",
    status === "error" && "#DC2626",
    "#3B82F6",
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
            $radioDetail,
            { backgroundColor: dotBackgroundColor },
            $detailStyleOverride,
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
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
};

const $radioDetail: ViewStyle = {
  width: 12,
  height: 12,
  borderRadius: 6,
};

const $inputOuter: StyleProp<ViewStyle> = [
  $inputOuterBase,
  { borderRadius: 12 },
];
