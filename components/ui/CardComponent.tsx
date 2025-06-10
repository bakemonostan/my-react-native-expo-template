import React from "react";
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
   * @default '#FFFFFF'
   */
  backgroundColor?: string;

  /**
   * Padding inside the card
   * @default 16
   */
  padding?: number;
}

/**
 * A reusable card component with consistent styling
 *
 * @example
 * ```tsx
 * <CardComponent>
 *   <Text>Simple Card Content</Text>
 * </CardComponent>
 * ```
 *
 * @example
 * ```tsx
 * <CardComponent
 *   elevated={true}
 *   borderRadius={16}
 *   backgroundColor="#F5F5F5"
 *   padding={20}
 * >
 *   <Text>Custom Styled Card</Text>
 * </CardComponent>
 * ```
 */
export default function CardComponent({
  children,
  style,
  elevated = true,
  borderRadius = 12,
  backgroundColor = "#FFFFFF",
  padding = 16,
}: CardComponentProps) {
  const baseStyles: ViewStyle = {
    backgroundColor,
    borderRadius,
    padding,
    ...(elevated && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    }),
  };

  return <View style={[baseStyles, style]}>{children}</View>;
}
