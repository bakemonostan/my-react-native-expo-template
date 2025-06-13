import {
  type InvalidateQueryFilters,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

/**
 * Custom hook for data fetching with React Query
 * @template TQueryFnData - The type of data returned by the query function
 * @template TError - The type of error that might be thrown
 * @template TData - The type of data that will be returned by the hook
 * @example
 * // Fetching user data
 * const { data, isLoading, error } = useDataQuery(
 *   ['user', userId],
 *   () => api.get(`/users/${userId}`),
 *   {
 *     onSuccess: (data) => {
 *       console.log('User data fetched:', data);
 *     },
 *     onError: (error) => {
 *       const errorMessage = getErrorMessage(error);
 *       console.error('Failed to fetch user:', errorMessage);
 *     }
 *   }
 * );
 */
export function useDataQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData
>(
  queryKey: string[],
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, TError> {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn,
    ...options,
  });
}

/**
 * Custom hook for data mutations with React Query
 * @template TData - The type of data returned by the mutation
 * @template TError - The type of error that might be thrown
 * @template TVariables - The type of variables passed to the mutation function
 * @template TContext - The type of context used in the mutation
 * @example
 * // Creating a new user
 * const { mutate, isLoading } = useDataMutation(
 *   (userData) => api.post('/users', userData),
 *   {
 *     onSuccess: (data) => {
 *       console.log('User created:', data);
 *       // Invalidate and refetch users list
 *       queryClient.invalidateQueries(['users']);
 *     },
 *     onError: (error: ApiError) => {
 *       const errorMessage = getErrorMessage(error);
 *       console.error('Failed to create user:', errorMessage);
 *       if (error.errors) {
 *         // Handle validation errors
 *         Object.entries(error.errors).forEach(([field, messages]) => {
 *           console.error(`${field}: ${messages.join(', ')}`);
 *         });
 *       }
 *     }
 *   }
 * );
 */
export function useDataMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  >
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
}

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
