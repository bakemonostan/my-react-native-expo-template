import { useTheme } from "@/hooks/useTheme";
import React, { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GorhomSheetModalWrapper } from "./GorhomSheetModalWrapper";

interface SheetProps {
  onClose?: () => void;
  onSubmit?: (selectedOption: string) => void;
}

export const TestBottomSheetModal = forwardRef<BottomSheetModal, SheetProps>(
  function TestBottomSheetModal(
    { onClose: _onClose, onSubmit: _onSubmit },
    ref,
  ) {
    const { colors } = useTheme();

    return (
      <GorhomSheetModalWrapper
        ref={ref}
        snapPoints={["50%"]}
        enablePanDownToClose={true}>
        <View
          style={[styles.container, { backgroundColor: colors.surface }]}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Modal Content
            </Text>
            <Pressable
              style={[
                styles.closeButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => {
                if (ref && "current" in ref && ref.current) {
                  ref.current.dismiss();
                }
              }}>
              <Text
                style={[
                  styles.closeButtonText,
                  { color: colors.primaryText },
                ]}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </GorhomSheetModalWrapper>
    );
  },
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontWeight: "bold",
  },
});
