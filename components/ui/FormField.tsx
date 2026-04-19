import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { getFontFamily } from './fontConfig';
import IconComponent, { VectorIconSlotProps } from './IconComponent';
import TextComponent from './TextComponent';

export interface FormFieldProps extends TextInputProps {
  /**
   * Field label displayed above the input.
   */
  label?: string;

  /**
   * Error message shown below the input. Also switches the border to error color.
   */
  error?: string;

  /**
   * Helper text shown below the input when there is no error.
   */
  helper?: string;

  /**
   * Icon rendered on the left inside the input container.
   */
  leftIcon?: VectorIconSlotProps;

  /**
   * Icon rendered on the right inside the input container.
   * Tap triggers `onRightIconPress` if provided.
   */
  rightIcon?: VectorIconSlotProps;

  /**
   * Called when the right icon is tapped.
   */
  onRightIconPress?: () => void;

  /**
   * Whether the field is required (adds a red asterisk to the label).
   * @default false
   */
  required?: boolean;

  /**
   * Outer container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * A fully-featured form field: label, icon slots, error + helper text — all theme-aware.
 *
 * Wraps React Native's `TextInput` and forwards all `TextInputProps`.
 * Keep `TextInputComponent` for raw inputs; use `FormField` whenever a label or icons are needed.
 *
 * @example Basic usage
 * ```tsx
 * <FormField
 *   label="Email"
 *   placeholder="you@example.com"
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 * />
 * ```
 *
 * @example With error
 * ```tsx
 * <FormField
 *   label="Password"
 *   secureTextEntry
 *   error="Password must be at least 8 characters"
 * />
 * ```
 *
 * @example Password with show/hide icon
 * ```tsx
 * const [show, setShow] = useState(false);
 * <FormField
 *   label="Password"
 *   secureTextEntry={!show}
 *   rightIcon={{ name: show ? "eye-off" : "eye", library: "Feather" }}
 *   onRightIconPress={() => setShow(v => !v)}
 * />
 * ```
 *
 * @example With left icon
 * ```tsx
 * <FormField
 *   label="Search"
 *   leftIcon={{ name: "search", library: "Feather" }}
 *   placeholder="Search…"
 * />
 * ```
 *
 * @example Required with helper
 * ```tsx
 * <FormField
 *   label="Username"
 *   required
 *   helper="Only letters, numbers, and underscores."
 * />
 * ```
 */
export default function FormField({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  onRightIconPress,
  required = false,
  containerStyle,
  style,
  ...inputProps
}: FormFieldProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : focused
      ? colors.primary
      : colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelRow}>
          <TextComponent
            weight='medium'
            size='sm'
            color={error ? colors.error : colors.text}
            style={styles.label}>
            {label}
          </TextComponent>
          {required && (
            <TextComponent
              size='sm'
              color={colors.error}>
              {' *'}
            </TextComponent>
          )}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: colors.surface,
          },
        ]}>
        {leftIcon && (
          <View style={styles.leftIconSlot}>
            <IconComponent
              {...leftIcon}
              size={leftIcon.size ?? 18}
              color={colors.textSecondary}
            />
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: getFontFamily('regular'),
              paddingLeft: leftIcon ? 0 : 12,
              paddingRight: rightIcon ? 0 : 12,
            },
            style,
          ]}
          placeholderTextColor={colors.textDim}
          onFocus={(e) => {
            setFocused(true);
            inputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            inputProps.onBlur?.(e);
          }}
          {...inputProps}
        />

        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconSlot}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <IconComponent
              {...rightIcon}
              size={rightIcon.size ?? 18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || helper) && (
        <TextComponent
          size='xs'
          color={error ? colors.error : colors.textSecondary}
          style={styles.helperText}>
          {error ?? helper}
        </TextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 48,
  },
  leftIconSlot: {
    paddingHorizontal: 12,
  },
  rightIconSlot: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
  helperText: {
    marginTop: 4,
  },
});
