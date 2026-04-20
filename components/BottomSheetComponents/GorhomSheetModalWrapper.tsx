// components/GorhomSheet.tsx
import { useTheme } from "@/hooks/useTheme";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetModal as BottomSheetModalType } from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
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
  ref,
) {
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        indicator: {
          backgroundColor: colors.textDim,
          width: 40,
        },
        contentContainer: {
          flex: 1,
          alignItems: "center",
        },
      }),
    [colors.textDim],
  );

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
      handleIndicatorStyle={styles.indicator}>
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});
