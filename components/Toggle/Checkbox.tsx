import { useTheme } from "@/hooks/useTheme";
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

/**
 * Checkbox built on `Toggle`: square control with animated fill and optional **`label`** / **`helper`**.
 *
 * @example Controlled checkbox with label
 * ```tsx
 * import { Checkbox } from "@/components/Toggle";
 * import { useState } from "react";
 *
 * function Row() {
 *   const [value, setValue] = useState(false);
 *   return (
 *     <Checkbox
 *       value={value}
 *       onValueChange={setValue}
 *       label="Email me updates"
 *     />
 *   );
 * }
 * ```
 *
 * @example Error state
 * ```tsx
 * <Checkbox value={false} onValueChange={() => {}} status="error" helper="You must accept" />
 * ```
 */
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

/** @see CheckboxToggleProps */
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

  const { colors } = useTheme();

  const opacity = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity.current, {
      toValue: on ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [on]);

  const offBackgroundColor = disabled
    ? colors.textDim
    : status === "error"
      ? colors.errorBackground
      : colors.border;

  const outerBorderColor = disabled
    ? colors.textDim
    : status === "error"
      ? colors.error
      : !on
        ? colors.text
        : colors.primary;

  const onBackgroundColor = disabled
    ? "transparent"
    : status === "error"
      ? colors.errorBackground
      : colors.primary;

  const iconTintColor = disabled
    ? colors.textSecondary
    : status === "error"
      ? colors.error
      : colors.primaryText;

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
