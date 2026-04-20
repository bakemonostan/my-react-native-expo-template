/**
 * Static layout presets keyed off default **`lightColors`** (`constants/Colors.ts`).
 * For screens that follow the user/wizard theme, prefer **`useTheme().colors`** instead.
 */
import { colors } from "@/constants/Colors";
import { StyleSheet, ViewStyle } from "react-native";
import { BorderRadius, Shadows } from "./borders-shadows-animations";
import { ComponentSizes } from "./component-dimensions";
import { Layout } from "./layout-dimensions";
import { TouchTargets } from "./touch-targets";

// Define base styles using satisfies for proper type checking
const $cardStyle = {
  backgroundColor: colors.surface,
  borderRadius: BorderRadius.md,
  padding: ComponentSizes.card.padding.base,
  borderWidth: 1,
  borderColor: colors.border,
  ...Shadows.ios.base,
} satisfies ViewStyle;

const $buttonPrimaryStyle = {
  backgroundColor: colors.primary,
  borderRadius: BorderRadius.base,
  ...TouchTargets.button.base,
  alignItems: "center" as const,
  justifyContent: "center" as const,
} satisfies ViewStyle;

const $buttonSecondaryStyle = {
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: BorderRadius.base,
  ...TouchTargets.button.base,
  alignItems: "center" as const,
  justifyContent: "center" as const,
} satisfies ViewStyle;

const $inputStyle = {
  backgroundColor: colors.background,
  height: ComponentSizes.input.height.base,
  paddingHorizontal: ComponentSizes.input.padding.base,
  borderBottomWidth: 1,
  borderColor: colors.border,
} satisfies ViewStyle;

const $listItemStyle = {
  backgroundColor: colors.surface,
  height: ComponentSizes.listItem.height.comfortable,
  paddingHorizontal: ComponentSizes.listItem.padding.base,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  borderBottomWidth: 1,
  borderBottomColor: colors.separator,
} satisfies ViewStyle;

const $centerContainerStyle = {
  flex: 1,
  justifyContent: "center",
} satisfies ViewStyle;

/** No backgroundColor — let Screen / navigator theme control it (dark mode). */
const $screenContainerStyle = {
  flex: 1,
  paddingTop: Layout.screen.paddingVertical,
  paddingHorizontal: Layout.screen.paddingHorizontal,
} satisfies ViewStyle;

// Export preset styles that can be used with style arrays
export const PresetStyles = {
  card: $cardStyle,
  button: {
    primary: $buttonPrimaryStyle,
    secondary: $buttonSecondaryStyle,
  },
  input: $inputStyle,
  listItem: $listItemStyle,
  screenContainer: $screenContainerStyle,
  centerContainerStyle: $centerContainerStyle,
};

// Alternative: Create StyleSheet version for better performance
export const PresetStyleSheet = StyleSheet.create({
  card: $cardStyle,
  buttonPrimary: $buttonPrimaryStyle,
  buttonSecondary: $buttonSecondaryStyle,
  input: $inputStyle,
  listItem: $listItemStyle,
  screenContainer: $screenContainerStyle,
  centerContainerStyle: $centerContainerStyle,
});

// Type definitions for better TypeScript support
export type PresetStyleNames = keyof typeof PresetStyles;
export type ButtonPresetNames = keyof typeof PresetStyles.button;
