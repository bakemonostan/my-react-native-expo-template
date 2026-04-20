import { mScale } from '@/constants/mixins';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/theme/spacing';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import IconComponent from './IconComponent';

/**
 * Selectable plan-style card with a right-hand check affordance. Tile uses
 * **`backgroundSecondary`** in light mode and **`surface`** in dark mode so it
 * isn’t harsh black on a light screen. **`onSelect(value)`** fires on tap; selection
 * border uses theme **`primary`**.
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
  style?: StyleProp<ViewStyle>;
  testID?: string;
  children: React.ReactNode;
}

function CheckMark({
  selected,
  disabled,
  checkColor,
  ringColor,
  selectedInnerBg,
}: {
  selected: boolean;
  disabled?: boolean;
  checkColor: string;
  ringColor: string;
  selectedInnerBg: string;
}) {
  return (
    <View
      style={[
        styles.checkContainer,
        selected && { backgroundColor: selectedInnerBg },
        !selected && styles.checkContainerUnselected,
        !selected && { borderColor: ringColor },
        disabled && styles.checkDisabled,
      ]}>
      {selected ? (
        <IconComponent
          library='Feather'
          name='check'
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
  const { colors, isDark } = useTheme();
  const isSelected = selectedValue === value;

  /** Light: soft tile on the page (not black). Dark: surface above background. */
  const cardBg = isDark ? colors.surface : colors.backgroundSecondary;
  const selectedBorder = colors.primary;
  const checkIconColor = colors.primary;
  const unselectedRing = isDark ? colors.textDim : colors.border;

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
        accessibilityRole='radio'
        accessibilityState={{ selected: isSelected, disabled }}
        testID={testID}>
        <View style={styles.content}>{children}</View>
        <View style={styles.checkMarkContainer}>
          <CheckMark
            selected={isSelected}
            disabled={disabled}
            checkColor={checkIconColor}
            ringColor={unselectedRing}
            selectedInnerBg={colors.surface}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'relative',
  },
  container: {
    borderRadius: mScale(24),
    borderWidth: mScale(2),
    borderColor: 'transparent',
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkMarkContainer: {},
  checkContainer: {
    width: mScale(22),
    height: mScale(22),
    borderRadius: mScale(11),
    alignItems: "center",
    justifyContent: "center",
  },
  checkContainerUnselected: {
    backgroundColor: 'transparent',
    borderWidth: mScale(2),
  },
  checkDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    paddingRight: Spacing.sm,
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
});
