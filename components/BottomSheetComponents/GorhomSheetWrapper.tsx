// components/GorhomSheet.tsx
import React, { forwardRef, ReactNode, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { View, StyleSheet } from "react-native";

interface GorhomSheetProps extends BottomSheetProps {
  children: ReactNode;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
}

export const GorhomSheet = forwardRef<BottomSheet, GorhomSheetProps>(
  (
    { children, snapPoints = ["25%", "50%"], enablePanDownToClose = true },
    ref
  ) => {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          style
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      ),
      []
    );
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
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
