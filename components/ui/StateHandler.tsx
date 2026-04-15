import React, { ReactNode } from 'react';
import ErrorState from './ErrorState';
import LoadingComponent from './LoadingComponent';

export interface StateHandlerProps<T> {
  /**
   * Whether data is currently loading
   */
  isLoading: boolean;

  /**
   * Error object if request failed
   */
  error: Error | null | unknown;

  /**
   * The data to render (null/undefined = empty state)
   */
  data: T | null | undefined;

  /**
   * Render function that receives the data when available
   */
  children: (data: NonNullable<T>) => ReactNode;

  /**
   * Custom loading component (optional)
   */
  loading?: ReactNode;

  /**
   * Custom error component (optional)
   */
  errorRenderer?: (error: unknown, retry?: () => void) => ReactNode;

  /**
   * Custom empty state component (optional)
   */
  empty?: ReactNode;

  /**
   * Callback to retry failed request (optional)
   */
  onRetry?: () => void;
}

/**
 * Handles loading, error, empty, and success render in one place (common with React Query / fetch hooks).
 *
 * @example List when data is ready
 * ```tsx
 * const { data, isLoading, error, refetch } = useProducts();
 *
 * <StateHandler
 *   isLoading={isLoading}
 *   error={error}
 *   data={data}
 *   onRetry={refetch}
 *   empty={<Text>No products found</Text>}
 * >
 *   {(products) => (
 *     <FlatList data={products} renderItem={({ item }) => <Row product={item} />} />
 *   )}
 * </StateHandler>
 * ```
 *
 * @example Custom loading UI
 * ```tsx
 * <StateHandler
 *   isLoading={isLoading}
 *   error={error}
 *   data={data}
 *   loading={<ActivityIndicator />}
 * >
 *   {(data) => <Content data={data} />}
 * </StateHandler>
 * ```
 *
 * @example Custom error UI
 * ```tsx
 * <StateHandler
 *   isLoading={false}
 *   error={err}
 *   data={null}
 *   errorRenderer={(e) => <Text>{String(e)}</Text>}
 * >
 *   {() => null}
 * </StateHandler>
 * ```
 */
export default function StateHandler<T>({
  isLoading,
  error,
  data,
  children,
  loading,
  errorRenderer,
  empty,
  onRetry,
}: StateHandlerProps<T>) {
  if (isLoading) return <>{loading || <LoadingComponent />}</>;

  if (error) {
    return (
      <>
        {errorRenderer ? (
          errorRenderer(error, onRetry)
        ) : (
          <ErrorState
            message={
              error instanceof Error ? error.message : 'Something went wrong'
            }
            onRetry={onRetry}
          />
        )}
      </>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <>{empty || null}</>;
  }

  return <>{children(data as NonNullable<T>)}</>;
}
