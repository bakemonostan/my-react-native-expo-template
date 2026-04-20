/**
 * Keyboard visibility and height from React Native’s `Keyboard` API.
 *
 * @packageDocumentation
 */

import { featureFlags } from "@/config/featureFlags";
import { useEffect, useState } from "react";
import { Keyboard, type KeyboardEvent, Platform } from "react-native";

/**
 * Snapshot from {@link useKeyboard} for layout or scroll adjustments.
 */
export interface KeyboardInfo {
  /** Soft keyboard height in density-independent pixels; `0` when hidden. */
  keyboardHeight: number;
  /**
   * Whether a keyboard show event has fired more recently than hide.
   * On web, support varies; treat as best-effort.
   */
  isVisible: boolean;
}

/**
 * Subscribes to `Keyboard` show/hide. Uses `keyboardWillShow` / `keyboardWillHide` on iOS and
 * `keyboardDidShow` / `keyboardDidHide` on other platforms (Android does not emit the `will*` events).
 *
 * @returns Latest `keyboardHeight` and `isVisible`; updates on keyboard transitions.
 *
 * @see {@link https://reactnative.dev/docs/keyboard | React Native Keyboard}
 *
 * @example
 * ```tsx
 * const { keyboardHeight, isVisible } = useKeyboard();
 *
 * return (
 *   <View style={{ paddingBottom: isVisible ? keyboardHeight : 0 }}>
 *     <TextInput />
 *   </View>
 * );
 * ```
 */
export function useKeyboard(): KeyboardInfo {
  const enabled = featureFlags.enableKeyboard;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = (e: KeyboardEvent) => {
      setKeyboardHeight(e.endCoordinates?.height ?? 0);
      setIsVisible(true);
    };
    const onHide = () => {
      setKeyboardHeight(0);
      setIsVisible(false);
    };

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [enabled]);

  if (!enabled) {
    return { keyboardHeight: 0, isVisible: false };
  }

  return { keyboardHeight, isVisible };
}
