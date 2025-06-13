import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from "../constants/Colors";
import { BorderRadius, Shadows } from "./borders-shadows-animations";
import { ComponentSizes } from "./component-dimensions";
import { Layout } from "./layout-dimensions";
import { TouchTargets } from "./touch-targets";

// Define base styles using satisfies for proper type checking
const $cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: BorderRadius.md,
  padding: ComponentSizes.card.padding.base,
  borderWidth: 1,
  ...Shadows.ios.base,
} satisfies ViewStyle;

const $buttonPrimaryStyle = {
  backgroundColor: "#007AFF",
  borderRadius: BorderRadius.base,
  ...TouchTargets.button.base,
  alignItems: "center" as const,
  justifyContent: "center" as const,
} satisfies ViewStyle;

const $buttonSecondaryStyle = {
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: "#007AFF",
  borderRadius: BorderRadius.base,
  ...TouchTargets.button.base,
  alignItems: "center" as const,
  justifyContent: "center" as const,
} satisfies ViewStyle;

const $inputStyle = {
  backgroundColor: Colors.light.lighBlueBg,
  height: ComponentSizes.input.height.base,
  paddingHorizontal: ComponentSizes.input.padding.base,
  borderBottomWidth: 1,
  borderColor: "#e9ecef",
} satisfies ViewStyle;

const $listItemStyle = {
  backgroundColor: "#ffffff",
  height: ComponentSizes.listItem.height.comfortable,
  paddingHorizontal: ComponentSizes.listItem.padding.base,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  borderBottomWidth: 1,
  borderBottomColor: "#f0f0f0",
} satisfies ViewStyle;

const $centerContainerStyle = {
  flex: 1,
  justifyContent: "center",
} satisfies ViewStyle;

const $screenContainerStyle = {
  flex: 1,
  backgroundColor: "white",
  paddingHorizontal: Layout.screen.paddingHorizontal,
  paddingTop: Layout.screen.paddingVertical,
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