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
 * Prefer **`TextComponent`** for app typography (sizes, weights); it now defaults
 * **`color`** from the same theme. Use **`Text`** / **`View`** here for raw RN
 * primitives when you only need semantic fg/bg.
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

/** Raw **`Text`** with **`colors.textSecondary`** (captions, hints). */
export function TextSecondary({ style, ...props }: TextProps) {
  const { colors } = useTheme();
  return (
    <DefaultText style={[{ color: colors.textSecondary }, style]} {...props} />
  );
}
