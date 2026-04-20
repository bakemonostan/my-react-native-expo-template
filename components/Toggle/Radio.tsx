import { useTheme } from "@/hooks/useTheme";
import { useEffect, useRef } from "react";
import { Animated, ColorValue, StyleProp, View, ViewStyle } from "react-native";

import {
  $inputOuterBase,
  BaseToggleInputProps,
  Toggle,
  ToggleProps,
} from "./Toggle";

/**
 * Radio option built on `Toggle`: circular outer ring and inner dot when selected.
 * Group options by keeping one piece of state (e.g. selected id) and set each row’s **`value`**
 * to `selected === thatOptionId`, and **`onValueChange`** to update selection.
 *
 * @example Two options sharing parent state
 * ```tsx
 * import { Radio } from "@/components/Toggle";
 * import { useState } from "react";
 * import { View } from "react-native";
 *
 * function PlanPicker() {
 *   const [plan, setPlan] = useState<"basic" | "pro">("basic");
 *   return (
 *     <View>
 *       <Radio
 *         value={plan === "basic"}
 *         onValueChange={() => setPlan("basic")}
 *         label="Basic"
 *       />
 *       <Radio
 *         value={plan === "pro"}
 *         onValueChange={() => setPlan("pro")}
 *         label="Pro"
 *       />
 *     </View>
 *   );
 * }
 * ```
 *
 * @example Validation error
 * ```tsx
 * <Radio value={false} onValueChange={() => {}} status="error" label="Pick one" />
 * ```
 */
export interface RadioToggleProps
  extends Omit<ToggleProps<RadioInputProps>, "ToggleInput"> {
  inputDetailStyle?: ViewStyle;
}

type RadioInputProps = BaseToggleInputProps<RadioToggleProps>;

/** @see RadioToggleProps */
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
      : colors.backgroundSecondary;

  const dotBackgroundColor = disabled
    ? colors.textSecondary
    : status === "error"
      ? colors.error
      : colors.primary;

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
