/**
 * System color scheme from React Native (native / non-web targets).
 *
 * @packageDocumentation
 */

/**
 * Re-exports React Native’s `useColorScheme` (`"light" | "dark" | null` / `undefined` depending on version).
 * Prefer `useTheme` from `@/hooks` for app tokens; use this when you need the OS scheme only.
 *
 * @returns Current system appearance string, or `null`/`undefined` when unknown.
 *
 * @see {@link https://reactnative.dev/docs/usecolorscheme | useColorScheme}
 *
 * @example
 * ```tsx
 * import { useColorScheme } from "@/hooks/useColorScheme";
 * const scheme = useColorScheme();
 * ```
 */
export { useColorScheme } from "react-native";
