/**
 * Global toast notifications via `react-native-toast-message`.
 *
 * @packageDocumentation
 */

import { featureFlags } from "@/config/featureFlags";
import Toast from "react-native-toast-message";

/**
 * Typed helpers around `Toast.show` (position top, default visibility 3000 ms).
 * Requires a single root `<ToastComponent />` (or equivalent) inside `ThemeProvider`.
 *
 * @returns Object with `success`, `error`, `info`, `warning` (each `text1`, optional `text2`, optional `visibilityTime`)
 * and `hide()` to dismiss the current toast.
 *
 * @see {@link https://github.com/calintamas/react-native-toast-message | react-native-toast-message}
 *
 * @example
 * ```tsx
 * import { useToast } from "@/hooks";
 *
 * const { success, error, info, warning } = useToast();
 *
 * success("Saved!");
 * error("Upload failed", "Check your connection and try again.");
 * info("Update available", undefined, 5000);
 * ```
 */
export function useToast() {
  const show = (
    type: "success" | "error" | "info" | "warning",
    text1: string,
    text2?: string,
    visibilityTime = 3000
  ) => {
    if (!featureFlags.enableToast) return;
    Toast.show({ type, text1, text2, visibilityTime, position: "top" });
  };

  return {
    success: (text1: string, text2?: string, visibilityTime?: number) =>
      show("success", text1, text2, visibilityTime),
    error: (text1: string, text2?: string, visibilityTime?: number) =>
      show("error", text1, text2, visibilityTime),
    info: (text1: string, text2?: string, visibilityTime?: number) =>
      show("info", text1, text2, visibilityTime),
    warning: (text1: string, text2?: string, visibilityTime?: number) =>
      show("warning", text1, text2, visibilityTime),
    hide: () => {
      if (!featureFlags.enableToast) return;
      Toast.hide();
    },
  };
}
