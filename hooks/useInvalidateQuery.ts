/**
 * TanStack Query v5: invalidate cached queries from components that already have a `QueryClient`.
 *
 * @packageDocumentation
 */

import {
  type InvalidateQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * Reads the nearest React Query client and exposes `invalidateQueries` with the v5 filter object shape.
 *
 * @returns `{ invalidateQueries }` — call with `{ queryKey }`, `{ predicate }`, or other `InvalidateQueryFilters`.
 *
 * @see {@link https://tanstack.com/query/v5/docs/framework/react/guides/query-invalidation | Query invalidation}
 *
 * @example
 * ```tsx
 * const { invalidateQueries } = useInvalidateQuery();
 *
 * invalidateQueries({ queryKey: ["users"] });
 *
 * invalidateQueries({
 *   predicate: (q) =>
 *     q.queryKey[0] === "users" || q.queryKey[0] === "posts",
 * });
 * ```
 */
export function useInvalidateQuery() {
  const queryClient = useQueryClient();

  const invalidateQueries = (filters: InvalidateQueryFilters) => {
    queryClient.invalidateQueries(filters);
  };

  return { invalidateQueries };
}
