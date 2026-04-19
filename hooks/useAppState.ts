/**
 * React Native `AppState` subscription: foreground vs background and related states.
 *
 * @packageDocumentation
 */

import { useEffect, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";

/**
 * Resolved fields from {@link useAppState}.
 */
export interface AppStateInfo {
  /** Raw status from `AppState` (`active`, `background`, `inactive`, …). */
  appState: AppStateStatus;
  /** Shorthand for `appState === "active"` (user-facing foreground). */
  isActive: boolean;
}

/**
 * Listens to `AppState` `"change"` events. Initial state comes from `AppState.currentState`.
 *
 * @returns Current `appState` and `isActive` convenience flag.
 *
 * @see {@link https://reactnative.dev/docs/appstate | React Native AppState}
 *
 * @example
 * ```tsx
 * const { isActive, appState } = useAppState();
 *
 * useEffect(() => {
 *   if (!isActive) pauseVideo();
 *   else resumeVideo();
 * }, [isActive]);
 * ```
 */
export function useAppState(): AppStateInfo {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState
  );

  useEffect(() => {
    const sub = AppState.addEventListener("change", setAppState);
    return () => sub.remove();
  }, []);

  return {
    appState,
    isActive: appState === "active",
  };
}
