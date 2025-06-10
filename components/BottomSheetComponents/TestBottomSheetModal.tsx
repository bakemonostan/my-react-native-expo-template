import React, { forwardRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GorhomSheetModalWrapper } from "./GorhomSheetModalWrapper";

interface SheetProps {
  onClose?: () => void;
  onSubmit?: (selectedOption: string) => void;
}

export const TestBottomSheetModal = forwardRef<BottomSheetModal, SheetProps>(
  ({ onClose, onSubmit }, ref) => {
    return (
      <GorhomSheetModalWrapper
        ref={ref}
        snapPoints={["50%"]}
        enablePanDownToClose={true}
      >
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Modal Content</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                if (ref && "current" in ref && ref.current) {
                  ref.current.dismiss();
                }
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </GorhomSheetModalWrapper>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalContent: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
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
