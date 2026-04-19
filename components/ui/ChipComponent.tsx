import { useTheme } from "@/context/ThemeContext";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import IconComponent, { VectorIconSlotProps } from "./IconComponent";
import TextComponent from "./TextComponent";

export type ChipVariant = "filled" | "outlined" | "soft";

export interface ChipComponentProps {
  /**
   * Text displayed inside the chip.
   */
  label: string;

  /**
   * Visual style of the chip.
   * - `filled` — solid primary background
   * - `outlined` — transparent with a border
   * - `soft` — light tinted background
   * @default "soft"
   */
  variant?: ChipVariant;

  /**
   * Whether the chip is in a selected/active state.
   * @default false
   */
  selected?: boolean;

  /**
   * Optional icon shown to the left of the label.
   */
  icon?: VectorIconSlotProps;

  /**
   * Whether to show a dismiss (×) button on the right.
   * @default false
   */
  dismissible?: boolean;

  /**
   * Called when the dismiss button is tapped.
   */
  onDismiss?: () => void;

  /**
   * Called when the chip itself is tapped.
   */
  onPress?: () => void;

  /**
   * Whether the chip is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Style override for the chip container.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * A compact chip / tag / pill for filters, categories, labels, and selections.
 *
 * @example Filter chips
 * ```tsx
 * {categories.map((cat) => (
 *   <ChipComponent
 *     key={cat.id}
 *     label={cat.name}
 *     selected={selected === cat.id}
 *     onPress={() => setSelected(cat.id)}
 *   />
 * ))}
 * ```
 *
 * @example Dismissible tag
 * ```tsx
 * <ChipComponent
 *   label="React Native"
 *   dismissible
 *   onDismiss={() => removeTag("React Native")}
 * />
 * ```
 *
 * @example Chip with icon
 * ```tsx
 * <ChipComponent
 *   label="Verified"
 *   icon={{ name: "checkmark-circle", library: "Ionicons" }}
 *   variant="filled"
 *   selected
 * />
 * ```
 */
export default function ChipComponent({
  label,
  variant = "soft",
  selected = false,
  icon,
  dismissible = false,
  onDismiss,
  onPress,
  disabled = false,
  style,
}: ChipComponentProps) {
  const { colors } = useTheme();

  const getContainerStyle = (): ViewStyle => {
    if (selected) {
      return { backgroundColor: colors.primary, borderColor: colors.primary };
    }
    switch (variant) {
      case "filled":
        return { backgroundColor: colors.primary, borderColor: colors.primary };
      case "outlined":
        return { backgroundColor: "transparent", borderColor: colors.border };
      case "soft":
      default:
        return {
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.backgroundSecondary,
        };
    }
  };

  const labelColor =
    selected || variant === "filled" ? colors.primaryText : colors.text;

  const iconColor =
    selected || variant === "filled" ? colors.primaryText : colors.textSecondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={[
        styles.container,
        getContainerStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && (
        <View style={styles.iconLeft}>
          <IconComponent
            {...icon}
            size={icon.size ?? 14}
            color={iconColor}
          />
        </View>
      )}

      <TextComponent
        size="sm"
        weight="medium"
        color={labelColor}
        style={styles.label}
      >
        {label}
      </TextComponent>

      {dismissible && (
        <TouchableOpacity
          onPress={onDismiss}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          style={styles.dismiss}
        >
          <IconComponent
            name="close"
            library="Ionicons"
            size={14}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  label: {
    lineHeight: 18,
  },
  iconLeft: {
    marginRight: 4,
  },
  dismiss: {
    marginLeft: 4,
  },
  disabled: {
    opacity: 0.4,
  },
});
