import { mScale } from "@/constants/mixins";
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from "@/utils/useSafeAreaInsetsStyle";

import { useScrollToTop } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { StatusBar, StatusBarProps, StatusBarStyle } from "expo-status-bar";
import { ReactNode, useEffect, useRef } from "react";
import {
  Keyboard,
  KeyboardEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const isIos = Platform.OS === "ios";

/**
 * Custom hook for handling keyboard events with conditional animations
 */
function useKeyboardHandler(enableAnimations: boolean = false) {
  const keyboardHeight = useSharedValue(0);
  const isKeyboardVisible = useSharedValue(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      isIos ? "keyboardWillShow" : "keyboardDidShow",
      (event: KeyboardEvent) => {
        if (enableAnimations) {
          keyboardHeight.value = withSpring(event.endCoordinates.height, {
            damping: 50,
            stiffness: 400,
          });
        } else {
          keyboardHeight.value = event.endCoordinates.height;
        }
        isKeyboardVisible.value = true;
      }
    );

    const hideSubscription = Keyboard.addListener(
      isIos ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        if (enableAnimations) {
          keyboardHeight.value = withSpring(0, {
            damping: 50,
            stiffness: 400,
          });
        } else {
          keyboardHeight.value = 0;
        }
        isKeyboardVisible.value = false;
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardHeight, isKeyboardVisible, enableAnimations]);

  return { keyboardHeight, isKeyboardVisible };
}

export interface ScreenProps {
  /**
   * Header component to display at the top of the screen
   * @example
   * ```tsx
   * // Simple text header
   * <Screen header={<Text style={{ fontSize: 24, fontWeight: 'bold' }}>My App</Text>}>
   *   <Text>Body content</Text>
   * </Screen>
   *
   * // Custom header with back button
   * <Screen
   *   header={
   *     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
   *       <TouchableOpacity onPress={() => navigation.goBack()}>
   *         <Icon name="arrow-left" size={24} />
   *       </TouchableOpacity>
   *       <Text style={{ marginLeft: 16, fontSize: 20 }}>Profile</Text>
   *     </View>
   *   }
   * >
   *   <ProfileContent />
   * </Screen>
   */
  header?: ReactNode;

  /**
   * Footer component to display beneath the content view
   * @example
   * ```tsx
   * // Simple button footer
   * <Screen footer={<Button title="Save Changes" onPress={handleSave} />}>
   *   <FormContent />
   * </Screen>
   *
   * // Footer with multiple actions
   * <Screen
   *   footer={
   *     <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
   *       <Button title="Cancel" variant="outline" onPress={handleCancel} />
   *       <Button title="Save" onPress={handleSave} />
   *     </View>
   *   }
   * >
   *   <FormContent />
   * </Screen>
   */
  footer?: ReactNode;

  /**
   * Floating footer component that stays at the bottom with blur effect
   * Useful for action buttons that should always be visible
   * @example
   * ```tsx
   * // Floating action button
   * <Screen
   *   floatingFooter={
   *     <TouchableOpacity
   *       style={{
   *         backgroundColor: '#007AFF',
   *         borderRadius: 28,
   *         width: 56,
   *         height: 56,
   *         justifyContent: 'center',
   *         alignItems: 'center',
   *         alignSelf: 'center',
   *         marginBottom: 16
   *       }}
   *       onPress={handleAddItem}
   *     >
   *       <Icon name="plus" size={24} color="white" />
   *     </TouchableOpacity>
   *   }
   * >
   *   <ItemList />
   * </Screen>
   *
   * // Floating footer with multiple actions
   * <Screen
   *   floatingFooter={
   *     <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 }}>
   *       <Button title="Share" onPress={handleShare} />
   *       <Button title="Edit" onPress={handleEdit} />
   *       <Button title="Delete" onPress={handleDelete} variant="danger" />
   *     </View>
   *   }
   * >
   *   <Content />
   * </Screen>
   */
  floatingFooter?: ReactNode;

  /**
   * Main body content of the screen
   * @example
   * ```tsx
   * <Screen>
   *   <View style={{ padding: 16 }}>
   *     <Text>Welcome to the app!</Text>
   *     <Button title="Get Started" onPress={handleStart} />
   *   </View>
   * </Screen>
   */
  children: ReactNode;

  /**
   * Whether the body content should be scrollable
   * @default true
   * @example
   * ```tsx
   * // Scrollable content (default) - good for long lists
   * <Screen scrollable={true}>
   *   {items.map(item => (
   *     <ListItem key={item.id} item={item} />
   *   ))}
   * </Screen>
   *
   * // Fixed content (no scrolling) - good for forms
   * <Screen scrollable={false}>
   *   <View style={{ padding: 16 }}>
   *     <TextInput placeholder="Email" />
   *     <TextInput placeholder="Password" secureTextEntry />
   *     <Button title="Login" onPress={handleLogin} />
   *   </View>
   * </Screen>
   */
  scrollable?: boolean;

  /**
   * Style for the header container
   * @example
   * ```tsx
   * <Screen
   *   header={<Text>My Header</Text>}
   *   headerStyle={{
   *     backgroundColor: '#007AFF',
   *     paddingVertical: 16,
   *     borderBottomWidth: 1,
   *     borderBottomColor: '#E5E5E5'
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  headerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for the body container
   * @example
   * ```tsx
   * <Screen
   *   bodyStyle={{
   *     paddingHorizontal: 16,
   *     backgroundColor: '#F8F9FA'
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  bodyStyle?: StyleProp<ViewStyle>;

  /**
   * Style for the footer container
   * @example
   * ```tsx
   * <Screen
   *   footer={<Button title="Save" />}
   *   footerStyle={{
   *     paddingHorizontal: 16,
   *     borderTopWidth: 1,
   *     borderTopColor: '#E5E5E5',
   *     backgroundColor: 'white'
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  footerStyle?: StyleProp<ViewStyle>;

  /**
   * Style for the floating footer container
   * @example
   * ```tsx
   * <Screen
   *   floatingFooter={<FloatingButton />}
   *   floatingFooterStyle={{
   *     paddingBottom: 20,
   *     shadowColor: '#000',
   *     shadowOffset: { width: 0, height: -2 },
   *     shadowOpacity: 0.1,
   *     shadowRadius: 4,
   *     elevation: 5
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  floatingFooterStyle?: StyleProp<ViewStyle>;

  /**
   * Style for the entire screen container
   * @example
   * ```tsx
   * <Screen
   *   style={{
   *     backgroundColor: '#F0F0F0'
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Background color for the screen
   * @default "#ffffff"
   * @example
   * ```tsx
   * // White background (default)
   * <Screen backgroundColor="#ffffff">
   *   <Content />
   * </Screen>
   *
   * // Custom background color
   * <Screen backgroundColor="#F8F9FA">
   *   <Content />
   * </Screen>
   *
   * // Dark theme
   * <Screen backgroundColor="#1A1A1A">
   *   <Content />
   * </Screen>
   */
  backgroundColor?: string;

  /**
   * Safe area edges to apply insets to
   * @default ["top"]
   * @example
   * ```tsx
   * // Only top safe area (default) - good for most screens
   * <Screen safeAreaEdges={["top"]}>
   *   <Content />
   * </Screen>
   *
   * // Top and bottom safe areas - good for full-screen content
   * <Screen safeAreaEdges={["top", "bottom"]}>
   *   <Content />
   * </Screen>
   *
   * // All edges - good for immersive experiences
   * <Screen safeAreaEdges={["top", "bottom", "left", "right"]}>
   *   <Content />
   * </Screen>
   *
   * // No safe areas - good for custom layouts
   * <Screen safeAreaEdges={[]}>
   *   <Content />
   * </Screen>
   */
  safeAreaEdges?: ExtendedEdge[];

  /**
   * Status bar style
   * @default "dark"
   * @example
   * ```tsx
   * // Dark status bar (default) - good for light backgrounds
   * <Screen statusBarStyle="dark">
   *   <Content />
   * </Screen>
   *
   * // Light status bar - good for dark backgrounds
   * <Screen statusBarStyle="light" backgroundColor="#1A1A1A">
   *   <Content />
   * </Screen>
   *
   * // Auto status bar - adapts to background
   * <Screen statusBarStyle="auto">
   *   <Content />
   * </Screen>
   */
  statusBarStyle?: StatusBarStyle;

  /**
   * Additional props for the StatusBar component
   * @example
   * ```tsx
   * <Screen
   *   StatusBarProps={{
   *     hidden: false,
   *     animated: true,
   *     backgroundColor: '#007AFF'
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  StatusBarProps?: StatusBarProps;

  /**
   * Additional props for the ScrollView component (only when scrollable=true)
   * @example
   * ```tsx
   * // With refresh control
   * <Screen
   *   scrollable={true}
   *   ScrollViewProps={{
   *     showsVerticalScrollIndicator: false,
   *     refreshControl: (
   *       <RefreshControl
   *         refreshing={loading}
   *         onRefresh={reload}
   *         colors={['#007AFF']}
   *       />
   *     )
   *   }}
   * >
   *   <Content />
   * </Screen>
   *
   * // With custom scroll behavior
   * <Screen
   *   scrollable={true}
   *   ScrollViewProps={{
   *     showsVerticalScrollIndicator: false,
   *     bounces: false,
   *     decelerationRate: 'fast',
   *     snapToInterval: 200,
   *     snapToAlignment: 'start'
   *   }}
   * >
   *   <Content />
   * </Screen>
   *
   * // With scroll event handling
   * <Screen
   *   scrollable={true}
   *   ScrollViewProps={{
   *     onScroll: (event) => {
   *       const offsetY = event.nativeEvent.contentOffset.y;
   *       // Handle scroll position
   *     },
   *     scrollEventThrottle: 16
   *   }}
   * >
   *   <Content />
   * </Screen>
   */
  ScrollViewProps?: ScrollViewProps;

  /**
   * Whether the footer should have padding
   * @default true
   */
  footerWithPadding?: boolean;

  /**
   * Whether to disable the keyboard spacer
   * @default false
   */
  disableKeyboardSpacer?: boolean;

  /**
   * Whether to enable keyboard animations
   * @default false
   * @description Set to true for screens without bottom sheets to enable smooth keyboard animations
   */
  enableKeyboardAnimations?: boolean;
}

/**
 * A flexible screen component that provides reliable keyboard avoiding, safe area handling,
 * and a clean header/body/footer layout structure without the issues of KeyboardAvoidingView.
 *
 * Uses custom keyboard handling with smooth animations for consistent behavior across platforms.
 * Features include:
 * - Automatic keyboard avoidance with smooth animations
 * - Safe area handling for different device notches
 * - Header, footer, and floating footer support
 * - Scrollable and non-scrollable content modes
 * - Status bar customization
 * - Blur effects for floating elements
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <Screen>
 *   <Text>Hello World</Text>
 * </Screen>
 *
 * // Complete screen with header, content, and footer
 * <Screen
 *   header={
 *     <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
 *       <TouchableOpacity onPress={() => navigation.goBack()}>
 *         <Icon name="arrow-left" size={24} />
 *       </TouchableOpacity>
 *       <Text style={{ marginLeft: 16, fontSize: 20 }}>Edit Profile</Text>
 *     </View>
 *   }
 *   footer={
 *     <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
 *       <Button title="Cancel" variant="outline" onPress={handleCancel} />
 *       <Button title="Save Changes" onPress={handleSave} />
 *     </View>
 *   }
 *   headerStyle={{ backgroundColor: '#007AFF' }}
 *   footerStyle={{ borderTopWidth: 1, borderTopColor: '#E5E5E5' }}
 * >
 *   <ProfileForm />
 * </Screen>
 *
 * // Screen with floating action button
 * <Screen
 *   floatingFooter={
 *     <TouchableOpacity
 *       style={{
 *         backgroundColor: '#007AFF',
 *         borderRadius: 28,
 *         width: 56,
 *         height: 56,
 *         justifyContent: 'center',
 *         alignItems: 'center',
 *         alignSelf: 'center',
 *         marginBottom: 16
 *       }}
 *       onPress={handleAddItem}
 *     >
 *       <Icon name="plus" size={24} color="white" />
 *     </TouchableOpacity>
 *   }
 * >
 *   <ItemList />
 * </Screen>
 *
 * // Non-scrollable form with keyboard handling
 * <Screen
 *   scrollable={false}
 *   safeAreaEdges={["top", "bottom"]}
 *   backgroundColor="#F8F9FA"
 *   statusBarStyle="dark"
 * >
 *   <View style={{ padding: 16 }}>
 *     <TextInput placeholder="Email" style={{ marginBottom: 16 }} />
 *     <TextInput placeholder="Password" secureTextEntry style={{ marginBottom: 16 }} />
 *     <Button title="Login" onPress={handleLogin} />
 *   </View>
 * </Screen>
 *
 * // Scrollable list with refresh control
 * <Screen
 *   scrollable={true}
 *   ScrollViewProps={{
 *     showsVerticalScrollIndicator: false,
 *     refreshControl: (
 *       <RefreshControl
 *         refreshing={loading}
 *         onRefresh={reload}
 *         colors={['#007AFF']}
 *       />
 *     )
 *   }}
 * >
 *   {items.map(item => (
 *     <ListItem key={item.id} item={item} />
 *   ))}
 * </Screen>
 *
 * // Dark theme screen
 * <Screen
 *   backgroundColor="#1A1A1A"
 *   statusBarStyle="light"
 *   safeAreaEdges={["top", "bottom"]}
 * >
 *   <View style={{ padding: 16 }}>
 *     <Text style={{ color: 'white' }}>Dark Theme Content</Text>
 *   </View>
 * </Screen>
 *
 * // Immersive full-screen experience
 * <Screen
 *   safeAreaEdges={["top", "bottom", "left", "right"]}
 *   backgroundColor="#000000"
 *   statusBarStyle="light"
 *   StatusBarProps={{ hidden: true }}
 * >
 *   <VideoPlayer />
 * </Screen>
 * ```
 */
export function Screen({
  header,
  footer,
  floatingFooter,
  children,
  scrollable = true,
  headerStyle,
  bodyStyle,
  footerStyle,
  footerWithPadding = true,
  floatingFooterStyle,
  style,
  backgroundColor = "#ffffff",
  safeAreaEdges = ["top", "bottom"],
  statusBarStyle = "auto",
  StatusBarProps,
  ScrollViewProps,
  disableKeyboardSpacer = false,
  enableKeyboardAnimations = true,
}: ScreenProps) {
  const scrollRef = useRef<ScrollView>(null);
  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);
  const { keyboardHeight } = useKeyboardHandler(enableKeyboardAnimations);

  // Auto scroll to top when tab is pressed
  useScrollToTop(scrollRef);

  // Animated style for keyboard spacing
  const keyboardSpacerStyle = useAnimatedStyle(() => {
    return {
      height: keyboardHeight.value,
    };
  });

  // Filter out backgroundColor from StatusBarProps to avoid edge-to-edge warning
  const {
    backgroundColor: statusBarBackgroundColor,
    ...filteredStatusBarProps
  } = StatusBarProps || {};

  const bodyContent = scrollable ? (
    <ScrollView
      ref={scrollRef}
      style={[$bodyContainer, bodyStyle]}
      contentContainerStyle={{ flexGrow: 1, paddingVertical: mScale(8) }}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      {...ScrollViewProps}>
      {children}
    </ScrollView>
  ) : (
    <View style={[$bodyContainer, bodyStyle]}>{children}</View>
  );

  return (
    <View
      style={[$screenContainer, { backgroundColor }, $containerInsets, style]}>
      {statusBarBackgroundColor && (
        <View
          style={[
            $statusBarBackground,
            { backgroundColor: statusBarBackgroundColor },
          ]}
        />
      )}

      <StatusBar
        style={statusBarStyle}
        {...filteredStatusBarProps}
      />

      <View style={$contentContainer}>
        {header && (
          <View style={[$headerContainer, headerStyle]}>{header}</View>
        )}

        {bodyContent}

        {floatingFooter && (
          <BlurView
            intensity={85}
            tint="systemChromeMaterialLight"
            style={[$floatingFooterContainer, floatingFooterStyle]}>
            {floatingFooter}
          </BlurView>
        )}
      </View>

      {/* Footer rendered outside content container to ensure it's always visible */}
      {footer && (
        <View
          style={[
            $footerContainer,
            { paddingHorizontal: footerWithPadding ? mScale(8) : undefined },
            footerStyle,
          ]}>
          {footer}
        </View>
      )}

      {/* Animated spacer that pushes content up when keyboard appears */}
      {!disableKeyboardSpacer && <Animated.View style={keyboardSpacerStyle} />}
    </View>
  );
}

// Styles
const $screenContainer: ViewStyle = {
  flex: 1,
  position: "relative",
};

const $contentContainer: ViewStyle = {
  flex: 1,
};

const $headerContainer: ViewStyle = {};

const $bodyContainer: ViewStyle = {
  flex: 1,
};

const $footerContainer: ViewStyle = {
  backgroundColor: "white",
  width: "100%",
  position: "relative",
  zIndex: 0,
};

const $floatingFooterContainer: ViewStyle = {
  backgroundColor: "transparent",
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: mScale(8),
  zIndex: 1,
};

const $statusBarBackground: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: mScale(35),
  zIndex: 2,
};
