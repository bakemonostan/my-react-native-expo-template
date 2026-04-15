/**
 * Theme-aware **`Text`** and **`View`** wrappers: default **foreground** / **background** from `useTheme().colors`.
 * Prefer calling **`useTheme()`** yourself for full control; these are quick primitives.
 *
 * @example Themed text
 * ```tsx
 * import { Text } from "@/components/ui/Themed";
 *
 * <Text>Uses colors.text</Text>
 * ```
 *
 * @example Themed surface
 * ```tsx
 * import { View } from "@/components/ui/Themed";
 *
 * <View style={{ padding: 16 }}>
 *   {children}
 * </View>
 * ```
 *
 * See `context/ThemeContext.tsx` — https://docs.expo.dev/develop/user-interface/color-themes/
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
