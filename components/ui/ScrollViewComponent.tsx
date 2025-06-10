import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";

/**
 * Props interface for the ScrollViewComponent
 */
interface ScrollViewComponentProps extends ScrollViewProps {
  /**
   * Custom styles for the content container
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Whether to show the vertical scroll indicator
   * @default true
   */
  showsVerticalScrollIndicator?: boolean;

  /**
   * Whether to show the horizontal scroll indicator
   * @default true
   */
  showsHorizontalScrollIndicator?: boolean;
}

/**
 * An enhanced ScrollView component with customizable scroll indicators and styling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ScrollViewComponent>
 *   <Text>Scrollable content</Text>
 * </ScrollViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling and scroll indicators
 * <ScrollViewComponent
 *   style={{ backgroundColor: '#F5F5F5' }}
 *   contentContainerStyle={{ padding: 16 }}
 *   showsVerticalScrollIndicator={true}
 *   showsHorizontalScrollIndicator={false}
 * >
 *   <Text>Custom styled scrollable content</Text>
 * </ScrollViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // With nested content
 * <ScrollViewComponent>
 *   <View style={{ gap: 16 }}>
 *     <Text>First item</Text>
 *     <Text>Second item</Text>
 *     <Text>Third item</Text>
 *   </View>
 * </ScrollViewComponent>
 * ```
 */
export default function ScrollViewComponent({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  style,
  ...restProps
}: ScrollViewComponentProps) {
  return (
    <ScrollView
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}
