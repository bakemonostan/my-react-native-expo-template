import { useTheme } from "@/context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { View, ViewStyle } from "react-native";

/**
 * Props for the GradientView component
 */
export interface GradientViewProps {
  children: React.ReactNode;
  borderWidth?: number;
  colors?: string[];
  style?: ViewStyle;
  showBorder?: boolean;
  borderRadius?: number;
  showShadow?: boolean;
  /** Override the inner background color. Defaults to theme background. */
  backgroundColor?: string;
}

/**
 * A reusable component that wraps children in a gradient border effect.
 *
 * This component creates a visual effect where content is surrounded by a gradient border
 * using LinearGradient. When `showBorder` is false, it renders as a simple rounded view
 * without the gradient effect.
 *
 * The gradient border is created by using padding on the LinearGradient component,
 * which creates the border width effect. The inner content has a white background
 * and adjusted border radius to fit within the gradient border.
 *
 * @example
 * ```tsx
 * // Basic usage with default gradient
 * <GradientView>
 *   <Text>Content with gradient border</Text>
 * </GradientView>
 * ```
 *
 * @example
 * ```tsx
 * // Custom colors and border radius
 * <GradientView
 *   colors={["#FF0000", "#00FF00", "#0000FF"]}
 *   borderRadius={12}
 *   borderWidth={2}>
 *   <View>
 *     <Text>Custom gradient border</Text>
 *   </View>
 * </GradientView>
 * ```
 *
 * @example
 * ```tsx
 * // Without gradient border (simple rounded view)
 * <GradientView
 *   showBorder={false}
 *   borderRadius={8}
 *   style={{ padding: 16 }}>
 *   <Text>Simple rounded view</Text>
 * </GradientView>
 * ```
 *
 * @example
 * ```tsx
 * // With custom styling
 * <GradientView
 *   style={{ margin: 16, width: 200 }}
 *   borderRadius={20}
 *   borderWidth={3}>
 *   <TextComponent variant="h2">Styled gradient view</TextComponent>
 * </GradientView>
 * ```
 */
export default function GradientView({
  children,
  borderWidth = 1.5,
  colors: gradientColors,
  style,
  showBorder = false,
  borderRadius = 6,
  showShadow = false,
  backgroundColor,
}: GradientViewProps) {
  const { colors } = useTheme();
  const innerBg = backgroundColor ?? colors.background;

  const defaultBrandGradient = useMemo(
    () =>
      [
        colors.palette.primary400,
        colors.palette.primary600,
        colors.palette.primary800,
      ] as [string, string, ...string[]],
    [
      colors.palette.primary400,
      colors.palette.primary600,
      colors.palette.primary800,
    ],
  );

  const lineColors = (
    gradientColors?.length ? gradientColors : defaultBrandGradient
  ) as [string, string, ...string[]];

  if (!showBorder) {
    return (
      <View style={[$container, style, { borderRadius }]}>
        <View style={[$content, { borderRadius, backgroundColor: innerBg }]}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        $container,
        style,
        { borderRadius },
        showShadow && $shadowContainer,
      ]}>
      <LinearGradient
        colors={lineColors}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[$gradient, { padding: borderWidth, borderRadius }]}>
        <View
          style={[
            $content,
            {
              borderRadius: Math.max(0, borderRadius - borderWidth),
              backgroundColor: innerBg,
            },
          ]}>
          {children}
        </View>
      </LinearGradient>
    </View>
  );
}

const $container: ViewStyle = {
  overflow: "hidden",
  borderWidth: 0,
  backgroundColor: "transparent",
};

const $shadowContainer: ViewStyle = {
  // shadowColor: "#010101",
  // shadowOffset: {
  //   width: 0,
  //   height: 1,
  // },
  // shadowOpacity: 0.05,
  // shadowRadius: 6,
  // elevation: 1,
};

const $gradient: ViewStyle = {
  overflow: "hidden",
};

const $content: ViewStyle = {
  overflow: "hidden",
};
