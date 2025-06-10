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
 * A simplified KeyboardAvoidingView component with customizable behavior and scroll support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SimpleKeyboardAvoidingView>
 *   <TextInput placeholder="Enter text" />
 * </SimpleKeyboardAvoidingView>
 * ```
 *
 * @example
 * ```tsx
 * // With scrollable content
 * <SimpleKeyboardAvoidingView
 *   scrollable={true}
 *   scrollViewStyle={{ flex: 1 }}
 *   contentContainerStyle={{ padding: 16 }}
 * >
 *   <TextInput placeholder="Enter text" />
 *   <Text>More content that will scroll when keyboard appears</Text>
 * </SimpleKeyboardAvoidingView>
 * ```
 *
 * @example
 * ```tsx
 * // Custom keyboard behavior
 * <SimpleKeyboardAvoidingView
 *   customBehavior="padding"
 *   keyboardShouldPersistTaps="handled"
 *   keyboardDismissMode="on-drag"
 * >
 *   <TextInput placeholder="Enter text" />
 * </SimpleKeyboardAvoidingView>
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
