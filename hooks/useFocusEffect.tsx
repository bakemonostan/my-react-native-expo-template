/**
 * React Navigation focus lifecycle helper for refetch-on-return patterns.
 *
 * @packageDocumentation
 */

import { useFocusEffect } from "@react-navigation/native";
import React from "react";

/**
 * Runs `refetch` whenever the screen becomes focused again, **skipping** the first focus (mount),
 * so the initial load stays with your query/data layer. Wrap `refetch` in `useCallback` where it is defined.
 *
 * @template T - Promise result type of `refetch` (often ignored).
 * @param refetch - Async function (e.g. `useQuery`’s `refetch`) invoked on subsequent focuses.
 *
 * @see {@link https://reactnavigation.org/docs/use-focus-effect | useFocusEffect}
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/react-native | TanStack Query + React Native}
 *
 * @example
 * ```tsx
 * import { useQuery } from "@tanstack/react-query";
 * import { useRefreshOnFocus } from "@/hooks";
 *
 * const { refetch } = useQuery({ queryKey: ["items"], queryFn: fetchItems });
 * useRefreshOnFocus(refetch);
 * ```
 */
export function useRefreshOnFocus<T>(refetch: () => Promise<T>) {
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      refetch();
    }, [refetch])
  );
}
