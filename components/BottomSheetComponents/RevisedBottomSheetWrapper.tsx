import { colors } from "@/constants/Colors";
import { mScale } from "@/utils/scaling";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, { ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import PressableComponent from "../ui/PressableComponent";
import ResponsiveText from "../ui/ResponsiveText";

export interface RevisedBottomSheetWrapperProps
  extends Omit<BottomSheetModalProps, "children"> {
  /**
   * Content to be rendered inside the bottom sheet
   */
  children: ReactNode;

  /**
   * Title to display in the header
   * @default "Title"
   */
  title?: string;

  /**
   * Text for the close button
   * @default "Close"
   */
  closeText?: string;

  /**
   * Callback function called when the close button is pressed
   */
  onClose?: () => void;

  /**
   * Background color for the main container
   * @default "rgba(242, 242, 242, 1)"
   */
  containerBgColor?: string;

  /**
   * Background color for the scroll view container
   * @default "white"
   */
  scrollViewBgColor?: string;

  /**
   * Whether to show the header section
   * @default true
   */
  showHeader?: boolean;

  /**
   * Whether to enable scrolling
   * @default true
   */
  scrollable?: boolean;

  /**
   * Footer content to render at the bottom
   */
  footerContent?: ReactNode;

  /**
   * Custom header component to replace the default header
   */
  customHeader?: ReactNode;

  /**
   * Snap points for the bottom sheet
   * @default ["50%"]
   */
  snapPoints?: (string | number)[];

  /**
   * Whether to enable pan down to close
   * @default true
   */
  enablePanDownToClose?: boolean;

  /**
   * Whether to enable dynamic sizing
   * @default false
   */
  enableDynamicSizing?: boolean;

  /**
   * Padding bottom for the bottom sheet
   * @default 70
   */
  paddingBottom?: number;
}

/**
 * A dynamic bottom sheet wrapper component based on FilterOptionsBottomSheet
 * that provides consistent styling and behavior while allowing all bottom sheet props
 * to be passed through to the underlying BottomSheetModal.
 *
 * @example
 * Basic usage:
 * ```tsx
 * const bottomSheetRef = useRef<BottomSheetModal>(null);
 *
 * <RevisedBottomSheetWrapper
 *   ref={bottomSheetRef}
 *   title="My Bottom Sheet"
 *   onClose={() => bottomSheetRef.current?.dismiss()}
 *   snapPoints={["60%"]}
 * >
 *   <View>
 *     <Text>Your content here</Text>
 *   </View>
 * </RevisedBottomSheetWrapper>
 * ```
 *
 * @example
 * With custom header and footer:
 * ```tsx
 * <RevisedBottomSheetWrapper
 *   ref={bottomSheetRef}
 *   title="Custom Layout"
 *   onClose={() => bottomSheetRef.current?.dismiss()}
 *   customHeader={<CustomHeaderComponent />}
 *   footerContent={<CustomFooterComponent />}
 *   scrollable={false}
 * >
 *   <View>
 *     <Text>Non-scrollable content</Text>
 *   </View>
 * </RevisedBottomSheetWrapper>
 * ```
 *
 * @example
 * With all bottom sheet props:
 * ```tsx
 * <RevisedBottomSheetWrapper
 *   ref={bottomSheetRef}
 *   title="Advanced Bottom Sheet"
 *   onClose={() => bottomSheetRef.current?.dismiss()}
 *   snapPoints={["25%", "50%", "90%"]}
 *   enablePanDownToClose={true}
 *   enableDynamicSizing={true}
 *   index={0}
 *   onChange={handleSheetChanges}
 *   onAnimate={handleAnimate}
 *   containerBgColor="rgba(0, 0, 0, 0.1)"
 *   scrollViewBgColor="rgba(255, 255, 255, 0.95)"
 * >
 *   <View>
 *     <Text>Advanced content with custom styling</Text>
 *   </View>
 * </RevisedBottomSheetWrapper>
 * ```
 */
const RevisedBottomSheetWrapper = React.forwardRef<
  BottomSheetModal,
  RevisedBottomSheetWrapperProps
>(function RevisedBottomSheetWrapper(
  {
    children,
    title = "Title",
    closeText = "Close",
    onClose,
    containerBgColor = "rgba(242, 242, 242, 1)",
    scrollViewBgColor = "white",
    showHeader = true,
    scrollable = true,
    paddingBottom = mScale(70),
    footerContent,
    customHeader,
    snapPoints = ["50%"],
    enablePanDownToClose = true,
    enableDynamicSizing = false,
    ...bottomSheetProps
  },
  ref
) {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
      enableDynamicSizing={enableDynamicSizing}
      handleIndicatorStyle={{ display: "none" }}
      handleStyle={{ height: 0, padding: 0 }}
      {...bottomSheetProps}>
      {showHeader && (
        <View style={styles.headerContainer}>
          {customHeader ? (
            customHeader
          ) : (
            <>
              <ResponsiveText
                variant="h4"
                text={title}
              />
              <View style={styles.headerButtons}>
                <PressableComponent
                  buttonText={closeText}
                  buttonTextColor={colors.palette.takersBlue100}
                  labelVariant="body2Regular"
                  size={"xs"}
                  style={styles.closeButton}
                  onPress={handleClose}
                />
              </View>
            </>
          )}
        </View>
      )}

      <View
        style={[
          styles.container,
          { backgroundColor: containerBgColor, paddingBottom: paddingBottom },
        ]}>
        <View
          style={[
            styles.scrollViewContainer,
            {
              backgroundColor: scrollViewBgColor,
            },
          ]}>
          {scrollable ? (
            <BottomSheetScrollView showsVerticalScrollIndicator={false}>
              {children}
            </BottomSheetScrollView>
          ) : (
            <View>{children}</View>
          )}
        </View>
      </View>

      {footerContent && (
        <View style={styles.footerContainer}>{footerContent}</View>
      )}
    </BottomSheetModal>
  );
});

export default RevisedBottomSheetWrapper;

const styles = StyleSheet.create({
  container: {
    gap: mScale(24),
    padding: mScale(12),
    flex: 1,
    justifyContent: "space-between",
  },
  scrollViewContainer: {
    borderRadius: mScale(8),
    padding: mScale(12),
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: mScale(12),
    backgroundColor: "white",
    paddingHorizontal: mScale(12),
    borderTopEndRadius: mScale(12),
    borderTopStartRadius: mScale(12),
  },
  headerButtons: {
    flexDirection: "row",
    gap: mScale(8),
  },
  closeButton: {
    backgroundColor: colors.palette.takersSoap20,
  },
  footerContainer: {
    padding: mScale(12),
    paddingBottom: mScale(58),
    backgroundColor: "white",
  },
});
