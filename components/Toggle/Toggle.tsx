import { ComponentType, FC, useMemo } from "react";
import {
  GestureResponderEvent,
  ImageStyle,
  StyleProp,
  SwitchProps,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import TextComponent from "@/components/ui-v2/TextComponent";

interface TextProps {
  text?: string;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export interface ToggleProps<T> extends Omit<TouchableOpacityProps, "style"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled";
  /**
   * If false, input is not editable. The default value is true.
   */
  editable?: TextInputProps["editable"];
  /**
   * The value of the field. If true the component will be turned on.
   */
  value?: boolean;
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: SwitchProps["onValueChange"];
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * Optional input wrapper style override.
   * This gives the inputs their size, shape, "off" background-color, and outer border.
   */
  inputOuterStyle?: ViewStyle;
  /**
   * Optional input style override.
   * This gives the inputs their inner characteristics and "on" background-color.
   */
  inputInnerStyle?: ViewStyle;
  /**
   * Optional detail style override.
   * See Checkbox, Radio, and Switch for more details
   */
  inputDetailStyle?: ViewStyle;
  /**
   * The position of the label relative to the action component.
   * Default: right
   */
  labelPosition?: "left" | "right";
  /**
   * The label text to display.
   */
  label?: string;
  /**
   * Style overrides for label text.
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps;
  /**
   * The helper text to display.
   */
  helper?: string;
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps;
  /**
   * The input control for the type of toggle component
   */
  ToggleInput: FC<BaseToggleInputProps<T>>;
}

export interface BaseToggleInputProps<T> {
  on: boolean;
  status: ToggleProps<T>["status"];
  disabled: boolean;
  outerStyle: ViewStyle;
  innerStyle: ViewStyle;
  detailStyle: ViewStyle | ImageStyle;
}

/**
 * Renders a boolean input.
 * This is a controlled component that requires an onValueChange callback that updates the value prop in order for the component to reflect user actions. If the value prop is not updated, the component will continue to render the supplied value prop instead of the expected result of any user actions.
 * @param {ToggleProps} props - The props for the `Toggle` component.
 * @returns {JSX.Element} The rendered `Toggle` component.
 */
export function Toggle<T>(props: ToggleProps<T>) {
  const {
    editable = true,
    status,
    value,
    onPress,
    onValueChange,
    labelPosition = "right",
    helper,
    HelperTextProps,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ToggleInput,
    accessibilityRole,
    ...WrapperProps
  } = props;

  const disabled =
    editable === false || status === "disabled" || props.disabled;

  const Wrapper = useMemo(
    () =>
      (disabled ? View : TouchableOpacity) as ComponentType<
        TouchableOpacityProps | ViewProps
      >,
    [disabled]
  );

  const $containerStyles = [$containerStyleOverride];
  const $inputWrapperStyles = [$row, $inputWrapper, $inputWrapperStyleOverride];
  const $helperStyles = [
    $helper,
    status === "error" && { color: "#DC2626" },
    HelperTextProps?.style,
  ];

  /**
   * @param {GestureResponderEvent} e - The event object.
   */
  function handlePress(e: GestureResponderEvent) {
    if (disabled) return;
    onValueChange?.(!value);
    onPress?.(e);
  }

  return (
    <Wrapper
      activeOpacity={1}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ checked: value, disabled }}
      {...WrapperProps}
      style={$containerStyles}
      onPress={handlePress}>
      <View style={$inputWrapperStyles}>
        {labelPosition === "left" && (
          <FieldLabel<T>
            {...props}
            labelPosition={labelPosition}
          />
        )}

        <ToggleInput
          on={!!value}
          disabled={!!disabled}
          status={status}
          outerStyle={props.inputOuterStyle ?? {}}
          innerStyle={props.inputInnerStyle ?? {}}
          detailStyle={props.inputDetailStyle ?? {}}
        />

        {labelPosition === "right" && (
          <FieldLabel<T>
            {...props}
            labelPosition={labelPosition}
          />
        )}
      </View>

      {!!helper && (
        <TextComponent
          weight="regular"
          size="sm"
          color="#666666"
          styles={$helperStyles}>
          {helper}
        </TextComponent>
      )}
    </Wrapper>
  );
}

/**
 * @param {ToggleProps} props - The props for the `FieldLabel` component.
 * @returns {JSX.Element} The rendered `FieldLabel` component.
 */
function FieldLabel<T>(props: ToggleProps<T>) {
  const {
    status,
    label,
    LabelTextProps,
    labelPosition,
    labelStyle: $labelStyleOverride,
  } = props;

  if (!label && !LabelTextProps?.children) return null;

  const $labelStyle = [
    $label,
    status === "error" && { color: "#DC2626" },
    labelPosition === "right" && $labelRight,
    labelPosition === "left" && $labelLeft,
    $labelStyleOverride,
    LabelTextProps?.style,
  ];

  return (
    <TextComponent
      weight="medium"
      size="base"
      color="#1a1a1a"
      styles={$labelStyle}>
      {label || LabelTextProps?.children}
    </TextComponent>
  );
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
};

const $inputWrapper: ViewStyle = {
  alignItems: "center",
};

export const $inputOuterBase: ViewStyle = {
  height: 24,
  width: 24,
  borderWidth: 2,
  alignItems: "center",
  overflow: "hidden",
  flexGrow: 0,
  flexShrink: 0,
  justifyContent: "space-between",
  flexDirection: "row",
};

const $helper: TextStyle = {
  marginTop: 4,
};

const $label: TextStyle = {
  flex: 1,
};

const $labelRight: TextStyle = {
  marginStart: 12,
};

const $labelLeft: TextStyle = {
  marginEnd: 12,
};
