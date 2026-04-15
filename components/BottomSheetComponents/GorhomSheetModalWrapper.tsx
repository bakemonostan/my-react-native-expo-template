// components/GorhomSheet.tsx
import React, { forwardRef, ReactNode, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetModal as BottomSheetModalType } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

type GorhomSheetProps = {
  children: ReactNode;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
};

export const GorhomSheetModalWrapper = forwardRef<
  BottomSheetModalType,
  GorhomSheetProps
>(function GorhomSheetModalWrapper(
  { children, snapPoints = ["25%", "50%"], enablePanDownToClose = true },
  ref
) {
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          style
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={enablePanDownToClose}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#999",
    width: 40,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
