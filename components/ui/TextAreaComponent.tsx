import { mScale } from "@/constants/mixins";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FontWeight, getFontFamily } from "./fontConfig";
import TextComponent from "./TextComponent";

export type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "xxl"
  | number;

export interface TextAreaComponentProps extends Omit<TextInputProps, "multiline"> {
  weight?: FontWeight;
  label?: string;
  color?: string;
  size?: FontSize;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  error?: string;
  errorColor?: string;
  minHeight?: number;
  maxHeight?: number;
  showCharacterCount?: boolean;
  maxLength?: number;
}

const FONT_SIZE_MAP: Record<Exclude<FontSize, number>, number> = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
};

/**
 * Multiline field aligned with **`TextComponent`** typography: optional **`label`**, **`error`** line,
 * character count, and theme-based border / fill from **`useTheme()`**.
 *
 * @example Notes field with limit
 * ```tsx
 * import TextAreaComponent from "@/components/ui/TextAreaComponent";
 * import { useState } from "react";
 *
 * function Notes() {
 *   const [text, setText] = useState("");
 *   return (
 *     <TextAreaComponent
 *       label="Notes"
 *       value={text}
 *       onChangeText={setText}
 *       maxLength={200}
 *       showCharacterCount
 *     />
 *   );
 * }
 * ```
 *
 * @example Validation error
 * ```tsx
 * <TextAreaComponent
 *   value={bio}
 *   onChangeText={setBio}
 *   error="Bio is required"
 * />
 * ```
 */
export default function TextAreaComponent({
  weight = "regular",
  color,
  size = "sm",
  label,
  inputStyle,
  containerStyle,
  backgroundColor,
  error,
  errorColor,
  minHeight = 100,
  maxHeight,
  showCharacterCount = false,
  maxLength,
  value,
  ...restProps
}: TextAreaComponentProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);

  const resolvedTextColor = color ?? colors.text;
  const resolvedErrorColor = errorColor ?? colors.error;
  const resolvedBg =
    backgroundColor ??
    (error ? colors.errorBackground : colors.backgroundSecondary);

  const getFontSize = (sizeValue: FontSize): number => {
    return typeof sizeValue === "number" ? sizeValue : FONT_SIZE_MAP[sizeValue];
  };

  const inputContainerStyle: ViewStyle = {
    backgroundColor: error
      ? colors.errorBackground
      : isFocused
        ? colors.palette.primary100
        : resolvedBg,
    borderRadius: mScale(8),
    minHeight: mScale(minHeight),
    maxHeight: maxHeight ? mScale(maxHeight) : undefined,
    paddingHorizontal: mScale(12),
    paddingVertical: mScale(12),
    borderWidth: 1,
    borderColor: error
      ? resolvedErrorColor
      : isFocused
        ? colors.primary
        : colors.border,
  };

  const textInputStyle: TextStyle = {
    fontFamily: getFontFamily(weight),
    fontSize: getFontSize(size),
    color: resolvedTextColor,
    textAlignVertical: "top",
  };

  const characterCount = value?.toString().length || 0;
  const placeholderMuted =
    colors.textDim ?? "rgba(0, 0, 0, 0.45)";

  return (
    <View style={containerStyle}>
      {label ? (
        <TextComponent
          weight="medium"
          size="sm"
          color={colors.text}
          style={{ marginBottom: mScale(8) }}>
          {label}
        </TextComponent>
      ) : null}

      <View style={inputContainerStyle}>
        <TextInput
          placeholder={restProps.placeholder ?? "Enter your text"}
          style={[textInputStyle, inputStyle]}
          placeholderTextColor={placeholderMuted}
          multiline
          value={value}
          maxLength={maxLength}
          onFocus={(e) => {
            setIsFocused(true);
            restProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            restProps.onBlur?.(e);
          }}
          {...restProps}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: mScale(4),
        }}>
        {error ? (
          <TextComponent
            variant="caption"
            color={resolvedErrorColor}
            text={error}
          />
        ) : (
          <View />
        )}

        {showCharacterCount && maxLength ? (
          <TextComponent
            variant="caption"
            color={
              characterCount > maxLength
                ? resolvedErrorColor
                : colors.textDim
            }
            text={`${characterCount}/${maxLength}`}
          />
        ) : null}
      </View>
    </View>
  );
}
