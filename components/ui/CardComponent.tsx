import { useTheme } from "@/hooks/useTheme";
import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export interface CardComponentProps {
  /**
   * Content to be rendered inside the card
   */
  children: React.ReactNode;

  /**
   * Custom styles for the card container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Whether to show a shadow effect
   * @default true
   */
  elevated?: boolean;

  /**
   * Border radius of the card
   * @default 12
   */
  borderRadius?: number;

  /**
   * Background color of the card
   * @default active **`colors.surface`**
   */
  backgroundColor?: string;

  /**
   * Padding inside the card
   * @default 16
   */
  padding?: number;
}

/**
 * A reusable card component with consistent styling and elevation effects.
 * 
 * ## Features
 * - **Elevation Support**: Optional shadow effects for depth
 * - **Flexible Styling**: Custom background, border radius, and padding
 * - **Consistent Design**: Standardized card appearance across the app
 * - **Type Safety**: TypeScript validates all styling props
 * - **Performance Optimized**: Efficient shadow rendering
 * 
 * ## Styling Options
 * - **Elevation**: Add shadow effects for material design look
 * - **Border Radius**: Custom corner rounding (default: 12px)
 * - **Background**: Custom background color (default: white)
 * - **Padding**: Internal spacing (default: 16px)
 *
 * @example
 * ```tsx
 * // Basic card with default styling
 * <CardComponent>
 *   <Text>Simple Card Content</Text>
 * </CardComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Elevated card with custom styling
 * <CardComponent
 *   elevated={true}
 *   borderRadius={16}
 *   backgroundColor="#F5F5F5"
 *   padding={20}
 * >
 *   <Text>Custom Styled Card with Shadow</Text>
 * </CardComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Flat card without elevation
 * <CardComponent
 *   elevated={false}
 *   backgroundColor="#E3F2FD"
 *   borderRadius={8}
 *   padding={12}
 * >
 *   <Text>Flat Card Design</Text>
 * </CardComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Card with complex content
 * <CardComponent
 *   elevated={true}
 *   style={{ marginHorizontal: 16, marginVertical: 8 }}
 * >
 *   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
 *     <AvatarComponent source={{ uri: 'https://example.com/avatar.jpg' }} size={40} />
 *     <View style={{ marginLeft: 12, flex: 1 }}>
 *       <Text style={{ fontWeight: 'bold' }}>John Doe</Text>
 *       <Text style={{ color: '#666' }}>Software Engineer</Text>
 *     </View>
 *     <BadgeComponent content="New" />
 *   </View>
 * </CardComponent>
 * ```
 *
 * @example
 * ```tsx
 * // Card with custom shadow
 * <CardComponent
 *   elevated={true}
 *   style={{
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 4 },
 *     shadowOpacity: 0.3,
 *     shadowRadius: 8,
 *     elevation: 8
 *   }}
 * >
 *   <Text>Card with Custom Shadow</Text>
 * </CardComponent>
 * ```
 */
export default function CardComponent({
  children,
  style,
  elevated = true,
  borderRadius = 12,
  backgroundColor,
  padding = 16,
}: CardComponentProps) {
  const { colors } = useTheme();
  const bg = backgroundColor ?? colors.surface;

  const baseStyles = useMemo((): ViewStyle => {
    return {
      backgroundColor: bg,
      borderRadius,
      padding,
      ...(elevated && {
        shadowColor: colors.palette.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }),
    };
  }, [bg, borderRadius, colors.palette.black, elevated, padding]);

  return <View style={[baseStyles, style]}>{children}</View>;
}
