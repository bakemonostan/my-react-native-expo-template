import { useTheme } from "@/context/ThemeContext";
import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import TextComponent from "./TextComponent";

export interface OTPInputProps {
  /**
   * Number of OTP digits.
   * @default 6
   */
  length?: number;

  /**
   * Called with the full OTP string whenever all digits are filled.
   */
  onComplete?: (otp: string) => void;

  /**
   * Called on every digit change with the current partial/full string.
   */
  onChange?: (otp: string) => void;

  /**
   * Error message shown below the boxes.
   */
  error?: string;

  /**
   * Whether to mask the digits (like a PIN).
   * @default false
   */
  secure?: boolean;

  /**
   * Whether the inputs are disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * OTP / verification code input — renders individual digit boxes,
 * handles auto-focus progression and backspace, and fires `onComplete`
 * when every box is filled.
 *
 * @example 6-digit OTP
 * ```tsx
 * <OTPInput
 *   length={6}
 *   onComplete={(code) => verifyCode(code)}
 * />
 * ```
 *
 * @example 4-digit PIN (masked)
 * ```tsx
 * <OTPInput
 *   length={4}
 *   secure
 *   onComplete={(pin) => confirmPin(pin)}
 * />
 * ```
 *
 * @example With error
 * ```tsx
 * <OTPInput
 *   length={6}
 *   error="Invalid code. Please try again."
 *   onComplete={verifyCode}
 * />
 * ```
 */
export default function OTPInput({
  length = 6,
  onComplete,
  onChange,
  error,
  secure = false,
  disabled = false,
  containerStyle,
}: OTPInputProps) {
  const { colors } = useTheme();
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const inputs = useRef<(TextInput | null)[]>([]);

  const updateDigit = (index: number, value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);

    const joined = next.join("");
    onChange?.(joined);

    if (cleaned && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
    if (joined.length === length && !next.includes("")) {
      onComplete?.(joined);
    }
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      inputs.current[index - 1]?.focus();
      onChange?.(next.join(""));
    }
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.row}>
        {Array.from({ length }).map((_, i) => {
          const isFilled = !!digits[i];
          const borderColor = error
            ? colors.error
            : isFilled
              ? colors.primary
              : colors.border;

          return (
            <TouchableOpacity
              key={i}
              activeOpacity={1}
              onPress={() => inputs.current[i]?.focus()}
            >
              <View
                style={[
                  styles.box,
                  {
                    borderColor,
                    backgroundColor: disabled
                      ? colors.backgroundSecondary
                      : colors.surface,
                  },
                ]}
              >
                <TextInput
                  ref={(ref) => {
                    inputs.current[i] = ref;
                  }}
                  style={[styles.input, { color: colors.text }]}
                  maxLength={1}
                  keyboardType="number-pad"
                  secureTextEntry={secure}
                  editable={!disabled}
                  value={digits[i]}
                  onChangeText={(val) => updateDigit(i, val)}
                  onKeyPress={(e) => handleKeyPress(i, e)}
                  textAlign="center"
                  selectTextOnFocus
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {error && (
        <TextComponent size="xs" color={colors.error} style={styles.error}>
          {error}
        </TextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  box: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  error: {
    marginTop: 8,
    textAlign: "center",
  },
});
