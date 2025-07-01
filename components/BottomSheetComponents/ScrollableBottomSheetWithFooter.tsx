import { Colors } from "@/constants/Colors";
import { mScale } from "@/constants/mixins";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import React, { useCallback, useMemo, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import PressableComponent from "../ui/PressableComponent";
import ResponsiveText from "../ui/ResponsiveText";

interface ScrollableBottomSheetProps {
  onClose: () => void;
  handleSheetChanges?: (index: number) => void;
  title?: string;
  horizontal?: boolean;
  snapPoints?: string[];
}

const ScrollableBottomSheetWithFooter = React.forwardRef<
  BottomSheet,
  ScrollableBottomSheetProps
>(function ScrollableBottomSheetWithFooter(
  {
    onClose,
    handleSheetChanges,
    title = "Tips",
    horizontal = true,
    snapPoints = ["50%"],
  },
  ref
) {
  const scrollViewRef = useRef<any>(null);
  const scrollPositionRef = useRef(0);

  const data = useMemo(
    () =>
      Array(40)
        .fill(0)
        .map((_, index) => `Subcategory ${index + 1}`),
    []
  );

  // Render item callback
  const renderItem = useCallback(
    (item: string) => (
      <View
        key={item}
        style={[
          styles.tipItem,
          horizontal && {
            borderWidth: 0,
          },
        ]}>
        <ResponsiveText variant="body1Regular">{item}</ResponsiveText>
      </View>
    ),
    []
  );

  const renderFooter = useCallback(
    (props: any) => (
      <BottomSheetFooter {...props}>
        <BlurView
          intensity={80}
          tint="extraLight"
          style={styles.footerContainer}>
          <PressableComponent
            btnLabel="Continue"
            onPress={onClose}
          />
        </BlurView>
      </BottomSheetFooter>
    ),
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
        onPress={onClose}
      />
    ),
    [onClose]
  );

  const handleScroll = useCallback(
    (event: any) => {
      if (horizontal) {
        scrollPositionRef.current = event.nativeEvent.contentOffset.x;
      }
    },
    [horizontal]
  );

  return (
    <BottomSheet
      ref={ref}
      footerComponent={renderFooter}
      onClose={onClose}
      snapPoints={snapPoints}
      index={-1}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      backdropComponent={renderBackdrop}
      handleStyle={styles.handleStyle}
      handleIndicatorStyle={styles.indicator}>
      <View style={styles.header}>
        <ResponsiveText variant="h4">{title}</ResponsiveText>
        <PressableComponent
          btnLabel="Close"
          style={styles.closeButton}
          onPress={onClose}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.listWrapper}>
          <BottomSheetScrollView
            ref={scrollViewRef}
            horizontal={horizontal}
            showsHorizontalScrollIndicator={horizontal ? false : undefined}
            showsVerticalScrollIndicator={horizontal ? undefined : false}
            contentContainerStyle={[
              styles.listContent,
              horizontal && styles.horizontalContent,
            ]}
            style={styles.flatListStyle}
            focusHook={useFocusEffect}
            onScroll={handleScroll}
            bounces={false}>
            {data.map(renderItem)}
          </BottomSheetScrollView>
        </View>
      </View>
    </BottomSheet>
  );
});

export default ScrollableBottomSheetWithFooter;

const styles = StyleSheet.create({
  indicator: {
    padding: 0,
    margin: 0,
    height: 0,
    width: 0,
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: mScale(10),
    borderTopRightRadius: mScale(10),
  },
  tipItem: {
    flexDirection: "row",
    gap: mScale(18),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: mScale(12),
    paddingHorizontal: mScale(16),
    backgroundColor: "transparent",
    borderRadius: mScale(8),
    borderColor: Colors.light.TakerSkyBlue,
    borderWidth: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: mScale(12),
  },
  listWrapper: {
    flex: 1,
    borderRadius: mScale(16),
    backgroundColor: Colors.light.background,
    marginBottom: Platform.OS === "ios" ? mScale(55) : mScale(60),
  },
  footerContainer: {
    backgroundColor: "transparent",
    padding: mScale(8),
  },
  handleStyle: {
    height: 0,
    padding: 0,
  },
  closeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  listContent: {
    paddingHorizontal: mScale(24),
  },
  horizontalContent: {
    flexDirection: "row",
    gap: mScale(12),
  },
  flatListStyle: {
    flex: 1,
  },
});
