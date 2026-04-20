import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IconComponent from './IconComponent';
import TextComponent from './TextComponent';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  /** Optional description shown below the label in the dropdown. */
  description?: string;
  disabled?: boolean;
}

export interface SelectComponentProps<T = string> {
  /**
   * Array of options to display.
   */
  options: SelectOption<T>[];

  /**
   * Currently selected value.
   */
  value?: T;

  /**
   * Called when the user selects an option.
   */
  onChange: (value: T, option: SelectOption<T>) => void;

  /**
   * Placeholder shown when no option is selected.
   * @default "Select an option"
   */
  placeholder?: string;

  /**
   * Label displayed above the select.
   */
  label?: string;

  /**
   * Error message shown below the select.
   */
  error?: string;

  /**
   * Whether the select is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * A modal-based select/picker component — fully theme-aware.
 * Uses a bottom modal so it works consistently on iOS and Android
 * without relying on the native Picker (which behaves differently per platform).
 *
 * @example Basic
 * ```tsx
 * const [country, setCountry] = useState<string>();
 * <SelectComponent
 *   label="Country"
 *   options={[
 *     { label: "Nigeria", value: "NG" },
 *     { label: "Ghana", value: "GH" },
 *     { label: "Kenya", value: "KE" },
 *   ]}
 *   value={country}
 *   onChange={setCountry}
 * />
 * ```
 *
 * @example With error
 * ```tsx
 * <SelectComponent
 *   label="Category"
 *   options={categories}
 *   value={selected}
 *   onChange={setSelected}
 *   error="Please select a category"
 * />
 * ```
 */
export default function SelectComponent<T = string>({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  containerStyle,
}: SelectComponentProps<T>) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  const borderColor = error ? colors.error : colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TextComponent
          weight='medium'
          size='sm'
          color={error ? colors.error : colors.text}
          style={styles.label}>
          {label}
        </TextComponent>
      )}

      <TouchableOpacity
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.7}
        style={[
          styles.trigger,
          {
            borderColor,
            backgroundColor: disabled
              ? colors.backgroundSecondary
              : colors.surface,
          },
        ]}>
        <TextComponent
          size='base'
          color={selected ? colors.text : colors.textDim}
          style={styles.triggerText}>
          {selected ? selected.label : placeholder}
        </TextComponent>
        <IconComponent
          name='chevron-down'
          library='Feather'
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      {error && (
        <TextComponent
          size='xs'
          color={colors.error}
          style={styles.error}>
          {error}
        </TextComponent>
      )}

      <Modal
        visible={open}
        transparent
        animationType='slide'
        onRequestClose={() => setOpen(false)}>
        <Pressable
          style={[
            styles.backdrop,
            { backgroundColor: colors.palette.black, opacity: 0.45 },
          ]}
          onPress={() => setOpen(false)}
        />
        <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
          <View
            style={[styles.sheetHandle, { backgroundColor: colors.border }]}
          />

          {label && (
            <TextComponent
              weight='semi_bold'
              size='md'
              color={colors.text}
              style={styles.sheetTitle}>
              {label}
            </TextComponent>
          )}

          <FlatList
            data={options}
            keyExtractor={(item) => String(item.value)}
            renderItem={({ item }) => {
              const isSelected = item.value === value;
              return (
                <TouchableOpacity
                  style={[
                    styles.option,
                    { borderBottomColor: colors.separator },
                    isSelected && {
                      backgroundColor: colors.backgroundSecondary,
                    },
                  ]}
                  onPress={() => {
                    if (!item.disabled) {
                      onChange(item.value, item);
                      setOpen(false);
                    }
                  }}
                  activeOpacity={0.7}
                  disabled={item.disabled}>
                  <View style={styles.optionContent}>
                    <TextComponent
                      weight={isSelected ? 'semi_bold' : 'regular'}
                      size='base'
                      color={item.disabled ? colors.textDim : colors.text}>
                      {item.label}
                    </TextComponent>
                    {item.description && (
                      <TextComponent
                        size='xs'
                        color={colors.textSecondary}
                        style={styles.optionDesc}>
                        {item.description}
                      </TextComponent>
                    )}
                  </View>
                  {isSelected && (
                    <IconComponent
                      name='checkmark'
                      library='Ionicons'
                      size={18}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 13,
    minHeight: 48,
  },
  triggerText: {
    flex: 1,
  },
  error: {
    marginTop: 4,
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    maxHeight: '60%',
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  sheetTitle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionContent: {
    flex: 1,
  },
  optionDesc: {
    marginTop: 2,
  },
});
