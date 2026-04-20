import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { DimensionValue, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/**
 * Animation direction for shimmer effect
 */
export enum ANIMATION_DIRECTION {
  /** Shimmer moves from left to right */
  leftToRight = "leftToRight",
  /** Shimmer moves from right to left */
  rightToLeft = "rightToLeft",
  /** Shimmer moves from top to bottom */
  topToBottom = "topToBottom",
  /** Shimmer moves from bottom to top */
  bottomToTop = "bottomToTop",
}

/**
 * Animation type for the skeleton
 */
export enum ANIMATION_TYPE {
  /** Shimmer effect - gradient moves across the skeleton */
  shiver = "shiver",
  /** Pulse effect - skeleton fades in and out */
  pulse = "pulse",
}

/**
 * Props for the SkeletonComponent
 */
export interface SkeletonComponentProps {
  /**
   * Width of the skeleton
   * @default "100%" (full width)
   * @example
   * ```tsx
   * <SkeletonComponent width={200} height={20} />
   * <SkeletonComponent width="80%" height={20} />
   * ```
   */
  width?: DimensionValue;

  /**
   * Height of the skeleton
   * @default 20
   * @example
   * ```tsx
   * <SkeletonComponent height={40} />
   * ```
   */
  height?: number;

  /**
   * Background color of the skeleton
   * @default theme **`colors.palette.primary100`** (subtle brand-tinted track)
   * @example
   * ```tsx
   * <SkeletonComponent backgroundColor="#F0F0F0" height={20} />
   * ```
   */
  backgroundColor?: string;

  /**
   * Whether the skeleton should be rounded
   * @default false
   * @example
   * ```tsx
   * <SkeletonComponent rounded={true} height={20} />
   * ```
   */
  rounded?: boolean;

  /**
   * Border radius when rounded is true
   * @default 4
   * @example
   * ```tsx
   * <SkeletonComponent rounded={true} borderRadius={8} height={20} />
   * ```
   */
  borderRadius?: number;

  /**
   * Custom styles for the skeleton container
   * @example
   * ```tsx
   * <SkeletonComponent
   *   style={{ marginBottom: 8, marginTop: 4 }}
   *   height={20}
   * />
   * ```
   */
  style?: ViewStyle;

  /**
   * Animation direction for shimmer effect
   * @default ANIMATION_DIRECTION.leftToRight
   * @example
   * ```tsx
   * <SkeletonComponent
   *   direction={ANIMATION_DIRECTION.rightToLeft}
   *   height={20}
   * />
   * ```
   */
  direction?: ANIMATION_DIRECTION;

  /**
   * Animation type
   * @default ANIMATION_TYPE.shiver
   * @example
   * ```tsx
   * <SkeletonComponent
   *   animationType={ANIMATION_TYPE.pulse}
   *   height={20}
   * />
   * ```
   */
  animationType?: ANIMATION_TYPE;
}

/**
 * A skeleton component with pulse and shimmer animations using React Native Reanimated v3
 *
 * This component provides smooth 60fps animations for loading states with two animation types:
 * - **Shimmer**: A gradient moves across the skeleton in the specified direction
 * - **Pulse**: The skeleton fades in and out repeatedly
 *
 * @example
 * ```tsx
 * // Basic shimmer skeleton (default)
 * <SkeletonComponent height={20} />
 *
 * // Pulse animation
 * <SkeletonComponent
 *   height={40}
 *   animationType={ANIMATION_TYPE.pulse}
 * />
 *
 * // Custom shimmer direction
 * <SkeletonComponent
 *   height={50}
 *   direction={ANIMATION_DIRECTION.rightToLeft}
 * />
 *
 * // Rounded skeleton
 * <SkeletonComponent
 *   height={60}
 *   rounded={true}
 *   borderRadius={8}
 * />
 *
 * // Multiple skeletons for a card layout
 * <View style={{ padding: 16 }}>
 *   <SkeletonComponent width="60%" height={24} rounded style={{ marginBottom: 8 }} />
 *   <SkeletonComponent width="100%" height={16} rounded style={{ marginBottom: 4 }} />
 *   <SkeletonComponent width="90%" height={16} rounded style={{ marginBottom: 4 }} />
 *   <SkeletonComponent width="70%" height={16} rounded />
 * </View>
 *
 * // Avatar skeleton
 * <SkeletonComponent
 *   width={50}
 *   height={50}
 *   rounded={true}
 *   borderRadius={25}
 * />
 *
 * // Text-like skeleton with custom styling
 * <SkeletonComponent
 *   width="80%"
 *   height={16}
 *   rounded={true}
 *   style={{ marginBottom: 8 }}
 * />
 * ```
 *
 * @param props - The skeleton component props
 * @returns A skeleton component with the specified animation
 */
export default function SkeletonComponent({
  width = "100%",
  height = 20,
  backgroundColor: backgroundColorProp,
  rounded = false,
  borderRadius = 4,
  style,
  direction = ANIMATION_DIRECTION.leftToRight,
  animationType = ANIMATION_TYPE.shiver,
}: SkeletonComponentProps) {
  const { colors } = useTheme();
  const backgroundColor =
    backgroundColorProp ?? colors.palette.primary100;

  const isXDirectionAnimation =
    direction === ANIMATION_DIRECTION.leftToRight ||
    direction === ANIMATION_DIRECTION.rightToLeft;

  const isYDirectionAnimation =
    direction === ANIMATION_DIRECTION.topToBottom ||
    direction === ANIMATION_DIRECTION.bottomToTop;

  // For pulse animation
  const opacity = useSharedValue(1);

  // For shimmer animation
  const translatex = useSharedValue(0);
  const translatey = useSharedValue(0);

  // Track dimensions of parent view for deciding movable boundaries
  const [parentDimensions, setParentDimensions] = useState({
    height: -1,
    width: -1,
  });

  // Track dimensions of child (gradient view) for deciding movable boundaries
  const [gradientDimensions, setGradientDimensions] = useState({
    height: -1,
    width: -1,
  });

  // To toggle between different direction of move
  const [coordinates, setCoordinates] = useState({
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  });

  // Pulse animation
  const animatedStyleParent = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Shimmer animation styles
  const animatedStyleX = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translatex.value,
        },
      ],
    };
  });

  const animatedStyleY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translatey.value,
        },
      ],
    };
  });

  // Cancel animations on unmount
  useEffect(() => {
    return () => {
      cancelAnimation(opacity);
      cancelAnimation(translatex);
      cancelAnimation(translatey);
    };
  }, [opacity, translatex, translatey]);

  // Set coordinates based on direction
  useEffect(() => {
    if (!direction) return;
    switch (direction) {
      case ANIMATION_DIRECTION.leftToRight:
        setCoordinates({
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        });
        break;
      case ANIMATION_DIRECTION.rightToLeft:
        setCoordinates({
          start: { x: 1, y: 0 },
          end: { x: 0, y: 0 },
        });
        break;
      case ANIMATION_DIRECTION.topToBottom:
        setCoordinates({
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        });
        break;
      case ANIMATION_DIRECTION.bottomToTop:
        setCoordinates({
          start: { x: 0, y: 1 },
          end: { x: 0, y: 0 },
        });
        break;
      default:
        break;
    }
  }, [direction]);

  // Pulse animation effect
  useEffect(() => {
    if (animationType !== ANIMATION_TYPE.pulse) {
      return;
    }

    opacity.value = withRepeat(
      withTiming(0.4, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, [animationType, opacity]);

  // Shimmer animation functions
  const animateAcrossXDirection = useCallback(() => {
    const overflowOffset = parentDimensions.width * 0.75;
    const leftMostEnd = -overflowOffset;
    const rightMostEnd =
      parentDimensions.width - gradientDimensions.width + overflowOffset;

    translatex.value =
      direction === ANIMATION_DIRECTION.leftToRight
        ? leftMostEnd
        : rightMostEnd;

    translatex.value = withRepeat(
      withDelay(
        800,
        withTiming(
          direction === ANIMATION_DIRECTION.leftToRight
            ? rightMostEnd
            : leftMostEnd,
          {
            duration: 500,
            easing: Easing.linear,
          }
        )
      ),
      -1
    );
  }, [parentDimensions, gradientDimensions, direction, translatex]);

  const animateAcrossYDirection = useCallback(() => {
    const overflowOffset = parentDimensions.height * 0.75;
    const topMostEnd = -overflowOffset;
    const bottomMostEnd =
      parentDimensions.height - gradientDimensions.height + overflowOffset;

    translatey.value =
      direction === ANIMATION_DIRECTION.topToBottom
        ? topMostEnd
        : bottomMostEnd;

    translatey.value = withRepeat(
      withDelay(
        800,
        withTiming(
          direction === ANIMATION_DIRECTION.topToBottom
            ? bottomMostEnd
            : topMostEnd,
          {
            duration: 500,
            easing: Easing.linear,
          }
        )
      ),
      -1
    );
  }, [parentDimensions, gradientDimensions, direction, translatey]);

  // Start shimmer animation when dimensions are ready
  useEffect(() => {
    if (
      parentDimensions.height !== -1 &&
      parentDimensions.width !== -1 &&
      gradientDimensions.height !== -1 &&
      gradientDimensions.width !== -1 &&
      direction &&
      animationType === ANIMATION_TYPE.shiver
    ) {
      if (isXDirectionAnimation) {
        animateAcrossXDirection();
      } else if (isYDirectionAnimation) {
        animateAcrossYDirection();
      }
    }
  }, [
    parentDimensions,
    gradientDimensions,
    direction,
    animationType,
    isXDirectionAnimation,
    isYDirectionAnimation,
    animateAcrossXDirection,
    animateAcrossYDirection,
  ]);

  const containerStyle: ViewStyle = {
    width,
    height,
    backgroundColor,
    borderRadius: rounded ? borderRadius : 0,
    overflow: "hidden",
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        style,
        animationType === ANIMATION_TYPE.pulse && animatedStyleParent,
      ]}
      onLayout={(event) => {
        if (
          parentDimensions.height === -1 &&
          parentDimensions.width === -1 &&
          animationType === ANIMATION_TYPE.shiver
        ) {
          setParentDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          });
        }
      }}>
      {animationType === ANIMATION_TYPE.shiver && (
        <Animated.View
          style={[
            isXDirectionAnimation && {
              height: "100%",
              width: "80%",
            },
            isXDirectionAnimation && animatedStyleX,
            isYDirectionAnimation && {
              height: "100%",
              width: "100%",
            },
            isYDirectionAnimation && animatedStyleY,
          ]}
          onLayout={(event) => {
            if (
              gradientDimensions.width === -1 &&
              gradientDimensions.height === -1
            ) {
              setGradientDimensions({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              });
            }
          }}>
          <LinearGradient
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0.7)",
              "rgba(255,255,255,0.6)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0)",
            ]}
            style={styles.background}
            start={coordinates.start}
            end={coordinates.end}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
  },
});
