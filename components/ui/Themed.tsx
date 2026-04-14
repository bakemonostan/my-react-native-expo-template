/**
 * Theme-aware primitive components.
 * These wrap RN's Text and View to automatically pick up the active color scheme.
 *
 * For most use cases, prefer using `useTheme()` directly in your component:
 *   const { colors } = useTheme();
 *
 * See: context/ThemeContext.tsx
 * Docs: https://docs.expo.dev/develop/user-interface/color-themes/
 */

import { useTheme } from "@/context/ThemeContext";
import {
  Text as DefaultText,
  View as DefaultView,
  type TextProps,
  type ViewProps,
} from "react-native";

export function Text({ style, ...props }: TextProps) {
  const { colors } = useTheme();
  return <DefaultText style={[{ color: colors.text }, style]} {...props} />;
}

export function View({ style, ...props }: ViewProps) {
  const { colors } = useTheme();
  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    />
  );
}
