/**
 * Central export surface for custom hooks (`import { … } from "@/hooks"`).
 *
 * Includes debouncing, keyboard, app state, media permissions, React Query helpers, network,
 * navigation focus refresh, toasts, and theme. Native `useColorScheme` lives in `./useColorScheme`
 * (not re-exported here — use `useTheme` for product UI).
 *
 * @packageDocumentation
 *
 * @example
 * ```tsx
 * import {
 *   useAppState,
 *   useDebounce,
 *   useTheme,
 *   useToast,
 * } from "@/hooks";
 * ```
 */

export { useAppState } from "./useAppState";
export type { AppStateInfo } from "./useAppState";

export { useDebounce, useDebouncedCallback } from "./useDebounce";

export { useKeyboard } from "./useKeyboard";
export type { KeyboardInfo } from "./useKeyboard";

export { useMediaPermissions } from "./useMediaPermissions";
export type {
  MediaPermissionStatus,
  UseMediaPermissionsResult,
} from "./useMediaPermissions";

export { usePrevious } from "./usePrevious";

export { useInvalidateQuery } from "./useInvalidateQuery";

export { useNetwork } from "./useNetwork";
export type { NetworkState } from "./useNetwork";

export { useRefreshOnFocus } from "./useFocusEffect";

export { useToast } from "./useToast";

export { useTheme } from "./useTheme";
export type { ThemeMode } from "./useTheme";
