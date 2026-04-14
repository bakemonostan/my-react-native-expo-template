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
 * An enhanced ScrollView component with customizable scroll indicators and styling.
 * 
 * ## Features
 * - **Scroll Indicators**: Control visibility of vertical and horizontal scroll indicators
 * - **Flexible Styling**: Custom container and content container styles
 * - **Performance Optimized**: Efficient scrolling with proper content sizing
 * - **Type Safety**: TypeScript validates all ScrollView props
 * - **Consistent API**: Extends native ScrollView with enhanced defaults
 * 
 * ## Default Behavior
 * - Vertical scroll indicator: hidden by default
 * - Horizontal scroll indicator: hidden by default
 * - Content container: flexGrow enabled for proper sizing
 *
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <ScrollViewComponent>
 *   <Text>Scrollable content</Text>
 * </ScrollViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling with visible scroll indicators
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
 * // ScrollView with complex content layout
 * <ScrollViewComponent
 *   contentContainerStyle={{ padding: 16 }}
 *   showsVerticalScrollIndicator={false}
 * >
 *   <View style={{ gap: 16 }}>
 *     <CardComponent>
 *       <Text>First card item</Text>
 *     </CardComponent>
 *     <CardComponent>
 *       <Text>Second card item</Text>
 *     </CardComponent>
 *     <CardComponent>
 *       <Text>Third card item</Text>
 *     </CardComponent>
 *   </View>
 * </ScrollViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Horizontal scrolling content
 * <ScrollViewComponent
 *   horizontal={true}
 *   showsHorizontalScrollIndicator={true}
 *   contentContainerStyle={{ paddingHorizontal: 16 }}
 * >
 *   <View style={{ flexDirection: 'row', gap: 12 }}>
 *     <CardComponent style={{ width: 200 }}>
 *       <Text>Horizontal item 1</Text>
 *     </CardComponent>
 *     <CardComponent style={{ width: 200 }}>
 *       <Text>Horizontal item 2</Text>
 *     </CardComponent>
 *     <CardComponent style={{ width: 200 }}>
 *       <Text>Horizontal item 3</Text>
 *     </CardComponent>
 *   </View>
 * </ScrollViewComponent>
 * ```
 *
 * @example
 * ```tsx
 * // ScrollView with custom scroll behavior
 * <ScrollViewComponent
 *   showsVerticalScrollIndicator={false}
 *   bounces={false}
 *   decelerationRate="fast"
 *   contentContainerStyle={{ paddingBottom: 100 }}
 * >
 *   <View style={{ gap: 20 }}>
 *     {items.map(item => (
 *       <ListItem key={item.id} {...item} />
 *     ))}
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
