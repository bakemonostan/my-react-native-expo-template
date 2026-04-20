import { useTheme } from "@/hooks/useTheme";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import IconComponent from "./IconComponent";
import TextComponent from "./TextComponent";

export type DateTimePickerFieldMode = "date" | "time";

export interface DateTimePickerFieldProps {
  /** Current value (controlled). */
  value: Date;
  onChange: (next: Date) => void;
  mode: DateTimePickerFieldMode;
  label?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

function formatValue(value: Date, mode: DateTimePickerFieldMode): string {
  if (mode === "time") {
    return value.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return value.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Native **date** or **time** picker field: label + themed trigger.
 * **iOS:** opens a centered modal (`inline` calendar / `spinner` time), not
 * the compact popover. **Android:** system dialog. Uses `ThemeContext` for
 * borders and `themeVariant` on the picker. **Web:** short notice only.
 */
export default function DateTimePickerField({
  value,
  onChange,
  mode,
  label,
  minimumDate,
  maximumDate,
  disabled = false,
  error,
  containerStyle,
}: DateTimePickerFieldProps) {
  const { colors, isDark } = useTheme();
  const [androidOpen, setAndroidOpen] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const [iosDraft, setIosDraft] = useState(value);

  useEffect(() => {
    if (iosOpen) {
      setIosDraft(value);
    }
  }, [iosOpen, value]);

  const borderColor = error ? colors.error : colors.border;
  const displayText = formatValue(value, mode);

  const applyChangeAndroid = (event: DateTimePickerEvent, selected?: Date) => {
    setAndroidOpen(false);
    if ("type" in event && event.type === "dismissed") {
      return;
    }
    if (selected) {
      onChange(selected);
    }
  };

  const applyIosDraft = (_event: DateTimePickerEvent, selected?: Date) => {
    if (selected) {
      setIosDraft(selected);
    }
  };

  const androidPicker = (
    <DateTimePicker
      value={value}
      mode={mode}
      display="default"
      onChange={applyChangeAndroid}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      themeVariant={isDark ? "dark" : "light"}
    />
  );

  const iosModalPicker = (
    <DateTimePicker
      value={iosDraft}
      mode={mode}
      display={mode === "time" ? "spinner" : "inline"}
      onChange={applyIosDraft}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      themeVariant={isDark ? "dark" : "light"}
    />
  );

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label ? (
        <TextComponent
          weight="medium"
          size="sm"
          color={error ? colors.error : colors.text}
          style={styles.label}
        >
          {label}
        </TextComponent>
      ) : null}

      {Platform.OS === "web" ? (
        <View
          style={[
            styles.trigger,
            {
              borderColor,
              backgroundColor: disabled
                ? colors.backgroundSecondary
                : colors.surface,
            },
          ]}
        >
          <TextComponent size="base" color={colors.textDim}>
            Native date/time pickers run on iOS and Android.
          </TextComponent>
        </View>
      ) : Platform.OS === "ios" ? (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            onPress={() => !disabled && setIosOpen(true)}
            style={[
              styles.trigger,
              {
                borderColor,
                backgroundColor: disabled
                  ? colors.backgroundSecondary
                  : colors.surface,
              },
            ]}
          >
            <TextComponent size="base" color={colors.text} style={styles.triggerText}>
              {displayText}
            </TextComponent>
            <IconComponent
              name={mode === "time" ? "clock" : "calendar"}
              library="Feather"
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
          <Modal
            visible={iosOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setIosOpen(false)}
          >
            <Pressable
              style={[
                styles.modalBackdrop,
                { backgroundColor: colors.palette.black, opacity: 0.45 },
              ]}
              onPress={() => setIosOpen(false)}
            >
              <Pressable
                style={[
                  styles.modalCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
                onPress={(e) => e.stopPropagation()}
              >
                <View style={styles.modalPickerWrap}>{iosModalPicker}</View>
                <View
                  style={[
                    styles.modalActions,
                    { borderTopColor: colors.border },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => setIosOpen(false)}
                    style={styles.modalBtn}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <TextComponent size="base" color={colors.textSecondary}>
                      Cancel
                    </TextComponent>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      onChange(iosDraft);
                      setIosOpen(false);
                    }}
                    style={styles.modalBtn}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <TextComponent
                      size="base"
                      weight="semi_bold"
                      color={colors.primary}
                    >
                      Done
                    </TextComponent>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={disabled}
            onPress={() => !disabled && setAndroidOpen(true)}
            style={[
              styles.trigger,
              {
                borderColor,
                backgroundColor: disabled
                  ? colors.backgroundSecondary
                  : colors.surface,
              },
            ]}
          >
            <TextComponent size="base" color={colors.text} style={styles.triggerText}>
              {displayText}
            </TextComponent>
            <IconComponent
              name={mode === "time" ? "clock" : "calendar"}
              library="Feather"
              size={18}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
          {androidOpen ? androidPicker : null}
        </>
      )}

      {error ? (
        <TextComponent size="xs" color={colors.error} style={styles.error}>
          {error}
        </TextComponent>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  label: {
    marginBottom: 6,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
  modalPickerWrap: {
    alignItems: "center",
    paddingVertical: 8,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  modalBtn: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  triggerText: {
    flex: 1,
  },
  error: {
    marginTop: 6,
  },
});
