/**
 * Application theme: semantic colors, resolved light/dark scheme, and persisted mode control.
 *
 * @packageDocumentation
 */

/**
 * Re-exports `useTheme` from `ThemeProvider` (`context/ThemeContext`): `colors`, `colorScheme`, `isDark`, `mode`, `setMode`.
 * Use this for all UI that should follow user theme; avoid hard-coded colors for surfaces and text.
 *
 * @returns Context value from the nearest `ThemeProvider`.
 *
 * @see `ThemeMode` — exported type alias from the same module.
 *
 * @example
 * ```tsx
 * const { colors, isDark, setMode } = useTheme();
 *
 * return (
 *   <View style={{ backgroundColor: colors.background }}>
 *     <Text style={{ color: colors.text }}>Hello</Text>
 *     <Button onPress={() => setMode("dark")} title="Dark" />
 *   </View>
 * );
 * ```
 */
export { useTheme } from "@/context/ThemeContext";
export type { ThemeMode } from "@/context/ThemeContext";
