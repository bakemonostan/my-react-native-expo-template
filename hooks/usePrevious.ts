/**
 * Tracks the previous value of a prop or state across renders (ref updated during render).
 *
 * @packageDocumentation
 */

import { useRef } from "react";

/**
 * On each render, returns the `value` from the **prior** render. On the first render, returns `undefined`.
 * Does not cause re-renders by itself; compare in `useEffect` or derive UI from `value` + previous.
 *
 * @template T - Type of the tracked value.
 * @param value - Current value (typically props or state).
 * @returns Previous render’s `value`, or `undefined` on the first render.
 *
 * @example
 * ```tsx
 * const prevUserId = usePrevious(userId);
 *
 * useEffect(() => {
 *   if (prevUserId !== undefined && prevUserId !== userId) {
 *     resetForm();
 *   }
 * }, [userId, prevUserId]);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  const previous = ref.current;
  ref.current = value;
  return previous;
}
