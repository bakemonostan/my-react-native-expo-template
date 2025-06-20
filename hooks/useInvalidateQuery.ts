import {
  type InvalidateQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

/**
 * Custom hook for invalidating queries
 * @returns Object containing refetchQuery function
 * @example
 * // Invalidate and refetch specific queries
 * const { refetchQuery } = useInvalidateQuery();
 * 
 * // Invalidate a single query
 * refetchQuery({ queryKey: ['users'] });
 * 
 * // Invalidate multiple queries
 * refetchQuery({ 
 *   predicate: (query) => 
 *     query.queryKey[0] === 'users' || 
 *     query.queryKey[0] === 'posts'
 * });
 */
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const refetchQuery = (queryKey: InvalidateQueryFilters) => {
    queryClient.invalidateQueries(queryKey);
  };

  return { refetchQuery };
}; 
