import { useScrollToTop } from "@react-navigation/native";
import { StatusBar, StatusBarProps, StatusBarStyle } from "expo-status-bar";
import { ReactNode, useRef } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ScrollViewProps,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context";

export type ExtendedEdge = Edge | "start" | "end";

const propertySuffixMap = {
  top: "Top",
  bottom: "Bottom",
  left: "Start",
  right: "End",
  start: "Start",
  end: "End",
} as const;

const edgeInsetMap: Record<string, Edge> = {
  start: "left",
  end: "right",
};

/**
 * Hook to create safe area inset styles
 */
function useSafeAreaInsetsStyle(
  safeAreaEdges: ExtendedEdge[] = [],
  property: "padding" | "margin" = "padding"
): Record<string, number> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, e) => {
    const value = edgeInsetMap[e] ?? e;
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
  }, {});
}

export interface ScreenV2Props {
  /**
   * Main body content of the screen
   */
  children: ReactNode;

  /**
   * Optional header component
   */
  header?: ReactNode;

  /**
   * Optional footer component
   */
  footer?: ReactNode;

  /**
   * Whether content should be scrollable
   * @default true
   */
  scrollable?: boolean;

  /**
   * Background color for the screen
   * @default "#ffffff"
   */
  backgroundColor?: string;

  /**
   * Safe area edges to apply insets to
   * @default ["top"]
   */
  safeAreaEdges?: ExtendedEdge[];

  /**
   * Status bar style
   * @default "auto"
   */
  statusBarStyle?: StatusBarStyle;

  /**
   * Additional StatusBar props
   */
  StatusBarProps?: StatusBarProps;

  /**
   * Additional ScrollView props (only when scrollable=true)
   */
  ScrollViewProps?: ScrollViewProps;

  /**
   * Style for entire screen container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Style for header container
   */
  headerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for body container
   */
  bodyStyle?: StyleProp<ViewStyle>;

  /**
   * Style for footer container
   */
  footerStyle?: StyleProp<ViewStyle>;
}

/**
 * A simplified screen component focused on layout structure.
 *
 * Handles:
 * - Safe area insets
 * - Status bar styling
 * - Header/body/footer layout
 * - Keyboard avoidance
 * - Scrollable/fixed content
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ScreenV2>
 *   <Text>Hello World</Text>
 * </ScreenV2>
 *
 * // With header and footer
 * <ScreenV2
 *   header={<Header title="Profile" />}
 *   footer={<Button title="Save" onPress={handleSave} />}
 * >
 *   <ProfileForm />
 * </ScreenV2>
 *
 * // With pull-to-refresh
 * <ScreenV2
 *   ScrollViewProps={{
 *     refreshControl: (
 *       <RefreshControl refreshing={isRefreshing} onRefresh={refetch} />
 *     )
 *   }}
 * >
 *   <Content />
 * </ScreenV2>
 *
 * // With loading/error states (compose yourself)
 * <ScreenV2>
 *   {isLoading && <LoadingComponent />}
 *   {isError && <ErrorState onRetry={refetch} />}
 *   {!isLoading && !isError && <YourContent />}
 * </ScreenV2>
 * ```
 */
export function ScreenV2({
  children,
  header,
  footer,
  scrollable = true,
  backgroundColor = "#ffffff",
  safeAreaEdges = ["top"],
  statusBarStyle = "auto",
  StatusBarProps,
  ScrollViewProps,
  style,
  headerStyle,
  bodyStyle,
  footerStyle,
}: ScreenV2Props) {
  const scrollRef = useRef<ScrollView>(null);
  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  useScrollToTop(scrollRef);

  const bodyContent = scrollable ? (
    <ScrollView
      ref={scrollRef}
      style={[$bodyContainer, bodyStyle]}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      {...ScrollViewProps}>
      {children}
    </ScrollView>
  ) : (
    <View style={[$bodyContainer, bodyStyle]}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={[$screenContainer, { backgroundColor }, $containerInsets, style]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        style={statusBarStyle}
        {...StatusBarProps}
      />

      {header && <View style={[$headerContainer, headerStyle]}>{header}</View>}

      {bodyContent}

      {footer && <View style={[$footerContainer, footerStyle]}>{footer}</View>}
    </KeyboardAvoidingView>
  );
}

const $screenContainer: ViewStyle = {
  flex: 1,
};

const $headerContainer: ViewStyle = {};

const $bodyContainer: ViewStyle = {
  flex: 1,
};

const $footerContainer: ViewStyle = {
  backgroundColor: "transparent",
  width: "100%",
};
