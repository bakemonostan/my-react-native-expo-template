import TextComponent from "@/components/ui/TextComponent";
import { useOffsetInfiniteQuery } from "@/hooks/useOffsetInfiniteQuery";
import { useTheme } from "@/hooks/useTheme";
import { PresetStyles } from "@/theme/presets";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";

type ProductRow = { id: number; title: string };

async function fetchProducts(
  offset: number,
  limit: number
): Promise<{ items: ProductRow[]; total: number }> {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${offset}`
  );
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const json = (await res.json()) as {
    products: ProductRow[];
    total: number;
  };
  return { items: json.products, total: json.total };
}

const QueryingScreen = () => {
  const { colors } = useTheme();
  const {
    flatItems,
    loadMore,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useOffsetInfiniteQuery<ProductRow>({
    queryKey: ["dummyjson", "products"],
    pageSize: 15,
    fetchRange: fetchProducts,
  });

  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <View style={[PresetStyles.centerContainerStyle, { flex: 1, gap: 12 }]}>
        <TextComponent style={{ textAlign: "center" }}>
          Infinite list + React Query
        </TextComponent>
        <TextComponent
          size="sm"
          color={colors.textSecondary}
          style={{ textAlign: "center", paddingHorizontal: 16 }}
        >
          Uses `useOffsetInfiniteQuery` (offset/limit) with DummyJSON. See TanStack
          infinite query docs for cursor APIs.
        </TextComponent>
        {isPending ? (
          <ActivityIndicator color={colors.primary} />
        ) : isError ? (
          <TextComponent color={colors.error}>
            {error?.message ?? "Error"}
          </TextComponent>
        ) : (
          <FlatList
            data={flatItems}
            keyExtractor={(item) => String(item.id)}
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            refreshControl={
              <RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={() => void refetch()} />
            }
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator style={{ marginVertical: 16 }} color={colors.primary} />
              ) : null
            }
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <TextComponent size="sm" color={colors.textSecondary}>
                  #{item.id}
                </TextComponent>
                <TextComponent>{item.title}</TextComponent>
              </View>
            )}
          />
        )}
        {!isPending && !isError ? (
          <TextComponent size="xs" color={colors.textSecondary}>
            {hasNextPage ? "Scroll for more…" : "End of list"}
          </TextComponent>
        ) : null}
      </View>
    </SafeAreaViewComponent>
  );
};

export default QueryingScreen;
