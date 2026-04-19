/**
 * Web implementation of `useColorScheme` for this template (fixed `"light"`).
 *
 * @packageDocumentation
 */

/**
 * Returns `"light"` on every call so server HTML and the first client render stay aligned.
 * For real dark mode on web, combine CSS `prefers-color-scheme`, Nativewind, or your design system.
 *
 * @returns Always the literal `"light"` in this stub.
 *
 * @example
 * ```tsx
 * const scheme = useColorScheme(); // "light"
 * ```
 */
export function useColorScheme() {
  return "light";
}
