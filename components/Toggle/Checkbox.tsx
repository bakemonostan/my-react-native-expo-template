import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  ColorValue,
  ImageStyle,
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

export interface CheckboxToggleProps extends Omit<
  ToggleProps<CheckboxInputProps>,
  "ToggleInput"
> {
  inputDetailStyle?: ImageStyle;
  /** Reserved for future icon variants */
  icon?: "check";
}

interface CheckboxInputProps extends BaseToggleInputProps<CheckboxToggleProps> {
  icon?: CheckboxToggleProps["icon"];
}

export function Checkbox(props: CheckboxToggleProps) {
  const { icon, ...rest } = props;
  const checkboxInput = useCallback(
    (toggleProps: CheckboxInputProps) => (
      <CheckboxInput
        {...toggleProps}
        icon={icon}
      />
    ),
    [icon],
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

  const offBackgroundColor = disabled
    ? "#9CA3AF"
    : status === "error"
      ? "#FEE2E2"
      : "#E5E7EB";

  const outerBorderColor = disabled
    ? "#9CA3AF"
    : status === "error"
      ? "#DC2626"
      : !on
        ? "#1F2937"
        : "#3B82F6";

  const onBackgroundColor = disabled
    ? "transparent"
    : status === "error"
      ? "#FEE2E2"
      : "#3B82F6";

  const iconTintColor = disabled
    ? "#6B7280"
    : status === "error"
      ? "#DC2626"
      : "#FFFFFF";

  return (
    <View
      style={[
        $inputOuter,
        {
          backgroundColor: offBackgroundColor as ColorValue,
          borderColor: outerBorderColor as ColorValue,
        },
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
            { backgroundColor: iconTintColor },
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
