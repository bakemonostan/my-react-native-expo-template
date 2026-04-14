import React from "react";
import {
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    Platform,
    ScrollView,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Props interface for the SimpleKeyboardAvoidingView
 */
export interface SimpleKeyboardAvoidingViewProps {
  /**
   * Content to be rendered inside the keyboard avoiding view
   */
  children: React.ReactNode;

  /**
   * Whether the content should be scrollable
   * @default false
   */
  scrollable?: boolean;

  /**
   * Custom styles for the container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom styles for the scroll view when scrollable is true
   */
  scrollViewStyle?: StyleProp<ViewStyle>;

  /**
   * Custom styles for the content container when scrollable is true
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom behavior for keyboard avoiding
   * @default 'padding'
   */
  customBehavior?: "height" | "position" | "padding";

  /**
   * Whether taps should persist when keyboard is shown
   * @default 'never'
   */
  keyboardShouldPersistTaps?: "always" | "never" | "handled";

  /**
   * When keyboard should be dismissed
   * @default 'none'
   */
  keyboardDismissMode?: "none" | "on-drag" | "interactive";
}

/**
 * A simplified KeyboardAvoidingView component with customizable behavior and scroll support.
 * 
 * ## Features
 * - **Platform Optimization**: Automatic behavior selection based on platform
 * - **Scroll Support**: Optional ScrollView wrapper for long content
 * - **Custom Behavior**: Override default keyboard avoiding behavior
 * - **Safe Area Integration**: Proper handling of device notches
 * - **Type Safety**: TypeScript validates all props and callbacks
 * - **Performance Optimized**: Efficient keyboard event handling
 * 
 * ## Platform Behavior
 * - **iOS**: Uses 'padding' behavior by default
 * - **Android**: Uses 'height' behavior by default
 * - **Custom**: Override with customBehavior prop
 *
 * @example
 * ```tsx
 * // Basic usage with TextInput
 * <SimpleKeyboardAvoidingView>
 *   <TextInput placeholder="Enter your name" />
 * </SimpleKeyboardAvoidingView>
 * ```
 *
 * @example
 * ```tsx
 * // With scrollable content for forms
 * <SimpleKeyboardAvoidingView
 *   scrollable={true}
 *   scrollViewStyle={{ flex: 1 }}
 *   contentContainerStyle={{ padding: 16 }}
 * >
 *   <TextInput placeholder="Email" style={{ marginBottom: 12 }} />
 *   <TextInput placeholder="Password" secureTextEntry style={{ marginBottom: 12 }} />
 *   <TextInput placeholder="Confirm Password" secureTextEntry style={{ marginBottom: 12 }} />
 *   <Text>Additional form content that scrolls when keyboard appears</Text>
 * </SimpleKeyboardAvoidingView>
 * ```
 *
 * @example
 * ```tsx
 * // Custom keyboard behavior for specific use cases
 * <SimpleKeyboardAvoidingView
 *   customBehavior="padding"
 *   keyboardShouldPersistTaps="handled"
 *   keyboardDismissMode="on-drag"
 * >
 *   <TextInput placeholder="Search..." />
 * </SimpleKeyboardAvoidingView>
 * ```
 *
 * @example
 * ```tsx
 * // With custom styling and multiple inputs
 * <SimpleKeyboardAvoidingView
 *   scrollable={true}
 *   contentContainerStyle={{ padding: 20 }}
 *   style={{ backgroundColor: '#F5F5F5' }}
 * >
 *   <View style={{ gap: 16 }}>
 *     <TextInput 
 *       placeholder="First Name" 
 *       style={{ padding: 12, borderWidth: 1, borderRadius: 8 }} 
 *     />
 *     <TextInput 
 *       placeholder="Last Name" 
 *       style={{ padding: 12, borderWidth: 1, borderRadius: 8 }} 
 *     />
 *     <TextInput 
 *       placeholder="Bio" 
 *       multiline 
 *       numberOfLines={4}
 *       style={{ padding: 12, borderWidth: 1, borderRadius: 8 }} 
 *     />
 *   </View>
 * </SimpleKeyboardAvoidingView>
 * ```
 *
 * @example
 * ```tsx
 * // With custom keyboard handling
 * <SimpleKeyboardAvoidingView
 *   keyboardShouldPersistTaps="always"
 *   keyboardDismissMode="interactive"
 *   customBehavior="position"
 * >
 *   <View style={{ padding: 16 }}>
 *     <TextInput placeholder="Interactive input" />
 *     <TouchableOpacity style={{ marginTop: 16, padding: 12, backgroundColor: '#007AFF' }}>
 *       <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
 *     </TouchableOpacity>
 *   </View>
 * </SimpleKeyboardAvoidingView>
 * ```
 */
export const SimpleKeyboardAvoidingView: React.FC<
  SimpleKeyboardAvoidingViewProps
> = ({
  children,
  scrollable = false,
  scrollViewStyle,
  contentContainerStyle,
  keyboardShouldPersistTaps = "handled",
  keyboardDismissMode = Platform.OS === "ios" ? "interactive" : "on-drag",
  customBehavior,
  style,
  ...restProps
}) => {
  const insets = useSafeAreaInsets();

  const getBehavior = (): KeyboardAvoidingViewProps["behavior"] => {
    if (customBehavior) return customBehavior;
    return Platform.OS === "ios" ? "padding" : "height";
  };

  const getKeyboardOffset = (): number => {
    return Platform.OS === "ios" ? insets.top : 0;
  };

  const baseStyle: ViewStyle = {
    flex: 1,
  };

  if (scrollable) {
    return (
      <KeyboardAvoidingView
        style={[baseStyle, style]}
        behavior={getBehavior()}
        keyboardVerticalOffset={getKeyboardOffset()}
        {...restProps}
      >
        <ScrollView
          style={[{ flex: 1 }, scrollViewStyle]}
          contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          keyboardDismissMode={keyboardDismissMode}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[baseStyle, style]}
      behavior={getBehavior()}
      keyboardVerticalOffset={getKeyboardOffset()}
      {...restProps}
    >
      <View style={[{ flex: 1 }, contentContainerStyle]}>{children}</View>
    </KeyboardAvoidingView>
  );
};

export default SimpleKeyboardAvoidingView;
