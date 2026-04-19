import { useTheme } from '@/context/ThemeContext';
import { Layout } from '@/theme/layout-dimensions';
import { useScrollToTop } from '@react-navigation/native';
import { StatusBar, StatusBarProps, StatusBarStyle } from 'expo-status-bar';
import { ReactNode, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, useSafeAreaInsets } from 'react-native-safe-area-context';

export type ExtendedEdge = Edge | 'start' | 'end';

const propertySuffixMap = {
  top: 'Top',
  bottom: 'Bottom',
  left: 'Start',
  right: 'End',
  start: 'Start',
  end: 'End',
} as const;

const edgeInsetMap: Record<string, Edge> = {
  start: 'left',
  end: 'right',
};

/**
 * Hook to create safe area inset styles
 */
function useSafeAreaInsetsStyle(
  safeAreaEdges: ExtendedEdge[] = [],
  property: 'padding' | 'margin' = 'padding',
): Record<string, number> {
  const insets = useSafeAreaInsets();

  return safeAreaEdges.reduce((acc, e) => {
    const value = edgeInsetMap[e] ?? e;
    return { ...acc, [`${property}${propertySuffixMap[e]}`]: insets[value] };
  }, {});
}

export interface ScreenProps {
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
   * Background color for the screen.
   * Defaults to the active theme's background color.
   * Pass an explicit string to override.
   */
  backgroundColor?: string;

  /**
   * Safe area edges to apply insets to (e.g. `["bottom"]` under a stack header).
   * @default []
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
  withDefaultPadding?: boolean;
}

/**
 * Screen layout: safe areas, status bar, header/body/footer, keyboard avoidance, optional scroll.
 *
 * @example Minimal body
 * ```tsx
 * <Screen>
 *   <Text>Hello World</Text>
 * </Screen>
 * ```
 *
 * @example Fixed header + scrollable body
 * ```tsx
 * <Screen
 *   header={<Text>Title</Text>}
 *   scrollable
 *   safeAreaEdges={["top", "bottom"]}
 * >
 *   <Text>Long content...</Text>
 * </Screen>
 * ```
 *
 * @example Footer CTA
 * ```tsx
 * <Screen footer={<PressableComponent buttonText="Save" onPress={save} />}>
 *   <TextComponent>Form fields</TextComponent>
 * </Screen>
 * ```
 */
export function Screen({
  children,
  header,
  footer,
  scrollable = true,
  backgroundColor,
  safeAreaEdges = [],
  statusBarStyle = 'auto',
  StatusBarProps,
  ScrollViewProps,
  style,
  headerStyle,
  bodyStyle,
  footerStyle,
  withDefaultPadding = true,
}: ScreenProps) {
  const { colors } = useTheme();
  const bgColor = backgroundColor ?? colors.background;
  const scrollRef = useRef<ScrollView>(null);
  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  useScrollToTop(scrollRef);

  const {
    contentContainerStyle: scrollContentContainerStyle,
    ...restScrollViewProps
  } = ScrollViewProps ?? {};

  const mergedContentContainerStyle = [
    { flexGrow: 1 as const },
    ...(Array.isArray(scrollContentContainerStyle)
      ? scrollContentContainerStyle
      : scrollContentContainerStyle != null
        ? [scrollContentContainerStyle]
        : []),
  ];

  const bodyContent = scrollable ? (
    <ScrollView
      ref={scrollRef}
      style={[$bodyContainer, bodyStyle]}
      contentContainerStyle={mergedContentContainerStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'
      {...restScrollViewProps}>
      {children}
    </ScrollView>
  ) : (
    <View style={[$bodyContainer, bodyStyle]}>{children}</View>
  );

  return (
    <KeyboardAvoidingView
      style={[
        $screenContainer,
        {
          paddingHorizontal: withDefaultPadding
            ? Layout.screen.paddingHorizontal
            : 0,
        },
        { backgroundColor: bgColor },
        $containerInsets,
        style,
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
  paddingTop: Layout.screen.paddingVertical,
  flex: 1,
};

const $footerContainer: ViewStyle = {
  paddingVertical: Layout.screen.paddingVertical,
  paddingHorizontal: Layout.screen.paddingHorizontal,
};
