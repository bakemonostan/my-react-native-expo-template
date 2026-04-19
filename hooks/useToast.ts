import Toast from "react-native-toast-message";

/**
 * Thin wrapper around `react-native-toast-message` for consistent toast calls.
 *
 * Make sure `<ToastComponent />` is rendered once at the root of your app
 * (inside `ThemeProvider`, outside everything else).
 *
 * @example
 * ```tsx
 * const { success, error, info, warning } = useToast();
 *
 * // Simple
 * success("Saved!");
 *
 * // With subtitle
 * error("Upload failed", "Check your connection and try again.");
 *
 * // Custom duration (ms)
 * info("Version update available", undefined, 5000);
 * ```
 */
export function useToast() {
  const show = (
    type: "success" | "error" | "info" | "warning",
    text1: string,
    text2?: string,
    visibilityTime = 3000
  ) => {
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
    hide: () => Toast.hide(),
  };
}
