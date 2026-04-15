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
      : "#F3F4F6";

  const dotBackgroundColor = disabled
    ? "#6B7280"
    : status === "error"
      ? "#DC2626"
      : "#3B82F6";

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
