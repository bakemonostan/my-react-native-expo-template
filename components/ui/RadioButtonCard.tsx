import { mScale } from "@/constants/mixins";
import { useTheme } from "@/hooks/useTheme";
import { Spacing } from "@/theme/spacing";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import IconComponent from "./IconComponent";

/**
 * Selectable dark card with a top-right check affordance. **`onSelect(value)`** fires when the user taps;
 * compare **`selectedValue`** to **`value`** to style selection (border uses theme **`primary`**).
 *
 * @example List of plans
 * ```tsx
 * import RadioButtonCard from "@/components/ui/RadioButtonCard";
 * import TextComponent from "@/components/ui/TextComponent";
 * import { useState } from "react";
 *
 * function Plans() {
 *   const [id, setId] = useState("pro");
 *   return (
 *     <>
 *       <RadioButtonCard value="basic" selectedValue={id} onSelect={setId}>
 *         <TextComponent>Basic</TextComponent>
 *       </RadioButtonCard>
 *       <RadioButtonCard value="pro" selectedValue={id} onSelect={setId}>
 *         <TextComponent>Pro</TextComponent>
 *       </RadioButtonCard>
 *     </>
 *   );
 * }
 * ```
 */
export interface RadioButtonCardProps {
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
  children: React.ReactNode;
}

function CheckMark({
  selected,
  disabled,
  checkColor,
  ringColor,
}: {
  selected: boolean;
  disabled?: boolean;
  checkColor: string;
  ringColor: string;
}) {
  return (
    <View
      style={[
        styles.checkContainer,
        !selected && styles.checkContainerUnselected,
        !selected && { borderColor: ringColor },
        disabled && styles.checkDisabled,
      ]}>
      {selected ? (
        <IconComponent
          library="Feather"
          name="check"
          size={mScale(12)}
          color={checkColor}
        />
      ) : null}
    </View>
  );
}

export default function RadioButtonCard({
  value,
  selectedValue,
  onSelect,
  disabled = false,
  style,
  testID,
  children,
}: RadioButtonCardProps) {
  const { colors } = useTheme();
  const isSelected = selectedValue === value;

  const cardBg = colors.palette.neutral900;
  const selectedBorder = colors.primary;
  const checkIconColor = colors.palette.neutral900;
  const unselectedRing = "rgba(255, 255, 255, 0.4)";

  return (
    <View style={[styles.cardWrapper, style]}>
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: cardBg },
          isSelected && { borderColor: selectedBorder },
          disabled && styles.disabled,
        ]}
        onPress={() => {
          if (!disabled) onSelect(value);
        }}
        disabled={disabled}
        activeOpacity={0.8}
        testID={testID}>
        <View style={styles.content}>{children}</View>
        <View style={styles.checkMarkContainer}>
          <CheckMark
            selected={isSelected}
            disabled={disabled}
            checkColor={checkIconColor}
            ringColor={unselectedRing}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: "relative",
  },
  container: {
    borderRadius: mScale(24),
    borderWidth: mScale(2),
    borderColor: "transparent",
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.base,
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkMarkContainer: {},
  checkContainer: {
    width: mScale(20),
    height: mScale(20),
    borderRadius: mScale(12),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: mScale(1) },
    shadowOpacity: 0.2,
    shadowRadius: mScale(2),
    elevation: 2,
  },
  checkContainerUnselected: {
    backgroundColor: "transparent",
    borderWidth: mScale(2),
  },
  checkDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    marginTop: Spacing.xs,
  },
  disabled: {
    opacity: 0.6,
  },
});
