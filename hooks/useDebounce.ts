/**
 * Debouncing utilities: stable value after idle time, or a debounced function handle.
 *
 * @packageDocumentation
 */

import { featureFlags } from "@/config/featureFlags";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Mirrors `value` but only updates in state after it has been unchanged for `delay` milliseconds.
 * Cancels pending updates when `value` or `delay` changes.
 *
 * @template T - Same type as the source value (string, number, object ref, etc.).
 * @param value - Source value to observe.
 * @param delay - Milliseconds to wait after the last change before updating the debounced result.
 * @returns The last “settled” value after the delay.
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState("");
 * const debounced = useDebounce(query, 300);
 *
 * useEffect(() => {
 *   // run search API when debounced value changes
 * }, [debounced]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const bypass = !featureFlags.enableDebounce;
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (bypass) {
      setDebounced(value);
      return;
    }
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay, bypass]);

  return bypass ? value : debounced;
}

/**
 * Returns a function with a stable identity (for a fixed `delay`) that forwards to `callback`
 * only after `delay` ms have passed without another call (trailing debounce).
 * Always sees the latest `callback` via a ref.
 *
 * @template Args - Tuple of argument types accepted by `callback`.
 * @param callback - Invoked once the debounce period expires after the last call.
 * @param delay - Debounce window in milliseconds.
 * @returns Debounced function to pass to handlers or effects.
 *
 * @example
 * ```tsx
 * const saveDraft = useDebouncedCallback((text: string) => {
 *   void persistToServer(text);
 * }, 500);
 *
 * <TextInput onChangeText={(t) => saveDraft(t)} />
 * ```
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  const bypass = !featureFlags.enableDebounce;
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return useCallback(
    (...args: Args) => {
      if (bypass) {
        callbackRef.current(...args);
        return;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        callbackRef.current(...args);
      }, delay);
    },
    [delay, bypass]
  );
}
