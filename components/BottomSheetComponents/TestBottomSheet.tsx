import { useTheme } from "@/hooks/useTheme";
import React, { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GorhomSheet } from "./GorhomSheetWrapper";

interface SheetProps {
  onSubmit?: (selectedOption: string) => void;
}

type HorizontalListItem = { id: string; title: string; color: string };

export const TestBottomSheet = forwardRef<BottomSheet, SheetProps>(
  function TestBottomSheet({ onSubmit: _onSubmit }, ref) {
    const { colors } = useTheme();

    const data = useMemo<HorizontalListItem[]>(
      () => [
        { id: "1", title: "Component 1", color: colors.palette.error500 },
        { id: "2", title: "Component 2", color: colors.palette.success500 },
        { id: "3", title: "Component 3", color: colors.palette.primary500 },
        { id: "4", title: "Component 4", color: colors.palette.warning500 },
      ],
      [
        colors.palette.error500,
        colors.palette.primary500,
        colors.palette.success500,
        colors.palette.warning500,
      ],
    );

    const renderItem = useCallback(
      ({ item }: { item: HorizontalListItem }) => (
        <View
          style={[
            styles.horizontalItem,
            {
              backgroundColor: item.color,
              shadowColor: colors.palette.black,
            },
          ]}>
          <Text style={[styles.itemText, { color: colors.palette.white }]}>
            {item.title}
          </Text>
        </View>
      ),
      [colors.palette.black, colors.palette.white],
    );

    return (
      <GorhomSheet
        enableDynamicSizing={false}
        snapPoints={["50%"]}
        enablePanDownToClose={true}
        ref={ref}>
        <View style={styles.container}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={(i: HorizontalListItem) => i.id}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={[
              styles.contentContainer,
              { backgroundColor: colors.surface },
            ]}
          />
        </View>
      </GorhomSheet>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  horizontalItem: {
    width: 150,
    height: "auto",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {},
});
