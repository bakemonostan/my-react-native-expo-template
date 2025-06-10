import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { GorhomSheet } from "./GorhomSheetWrapper";

interface SheetProps {
  onSubmit?: (selectedOption: string) => void;
}

export const TestBottomSheet = forwardRef<BottomSheet, SheetProps>(
  ({ onSubmit }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);

    const data = useMemo(
      () => [
        { id: "1", title: "Component 1", color: "#FF6B6B" },
        { id: "2", title: "Component 2", color: "#4ECDC4" },
        { id: "3", title: "Component 3", color: "#45B7D1" },
        { id: "4", title: "Component 4", color: "#96CEB4" },
      ],
      []
    );
    const renderItem = useCallback(
      ({ item }: any) => (
        <View style={[styles.horizontalItem, { backgroundColor: item.color }]}>
          <Text style={styles.itemText}>{item.title}</Text>
        </View>
      ),
      []
    );

    return (
      <GorhomSheet
        enableDynamicSizing={false}
        snapPoints={["50%"]}
        enablePanDownToClose={true}
        ref={ref}
      >
        <View style={styles.container}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={(i) => i.id}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={styles.contentContainer}
          />
          {/* <Pressable
              style={styles.closeButton}
              onPress={() => {
                if (ref && "current" in ref && ref.current) {
                  ref.current.close();
                }
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable> */}
        </View>
      </GorhomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  horizontalItem: {
    width: 150,
    height: "auto",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
  },
  modalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 200,
//   },
//   contentContainer: {
//     backgroundColor: "white",
//   },
//   itemContainer: {
//     padding: 6,
//     margin: 6,
//     backgroundColor: "#eee",
//   },
// });
