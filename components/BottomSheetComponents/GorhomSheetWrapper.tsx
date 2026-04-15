// components/GorhomSheet.tsx
import React, { forwardRef, ReactNode } from "react";
import BottomSheet, { BottomSheetProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

interface GorhomSheetProps extends BottomSheetProps {
  children: ReactNode;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
}

export const GorhomSheet = forwardRef<BottomSheet, GorhomSheetProps>(
  function GorhomSheet(
    { children, snapPoints = ["25%", "50%"], enablePanDownToClose = true },
    ref
  ) {
    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
