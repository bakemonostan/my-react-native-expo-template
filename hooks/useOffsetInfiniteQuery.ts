/**
 * Offset/limit infinite list helper on top of TanStack `useInfiniteQuery`.
 *
 * @packageDocumentation
 * @see {@link https://tanstack.com/query/v5/docs/framework/react/guides/infinite-queries | Infinite queries}
 */

import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import { useMemo, useCallback } from "react";

/** One page from an API that uses `skip`/`offset` + `total` count. */
export type OffsetPage<T> = {
  items: T[];
  total: number;
};

export type UseOffsetInfiniteQueryOptions<T> = {
  queryKey: QueryKey;
  /** Page size (limit) sent to the server. @default 20 */
  pageSize?: number;
  /**
   * Fetch one page: `offset` is cumulative items already loaded (matches DummyJSON-style `skip`).
   */
  fetchRange: (offset: number, limit: number) => Promise<OffsetPage<T>>;
};

/**
 * Standard “offset + limit” pagination: `getNextPageParam` advances by cumulative item count until `total`.
 *
 * @template T - Row type inside each page’s `items`.
 *
 * @example
 * ```tsx
 * const { flatItems, loadMore, hasNextPage, isFetchingNextPage } =
 *   useOffsetInfiniteQuery<Product>({
 *     queryKey: ["products"],
 *     pageSize: 20,
 *     fetchRange: (offset, limit) =>
 *       fetch(`/api/items?skip=${offset}&limit=${limit}`).then((r) => r.json()),
 *   });
 * ```
 */
export function useOffsetInfiniteQuery<T>(
  options: UseOffsetInfiniteQueryOptions<T>
) {
  const limit = options.pageSize ?? 20;

  const query = useInfiniteQuery({
    queryKey: [...options.queryKey, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      options.fetchRange(pageParam as number, limit),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.items.length, 0);
      if (loaded >= lastPage.total) return undefined;
      return loaded;
    },
  });

  const flatItems = useMemo(
    () => query.data?.pages.flatMap((p) => p.items) ?? [],
    [query.data]
  );

  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage();
    }
  }, [query]);

  return { ...query, flatItems, loadMore };
}
