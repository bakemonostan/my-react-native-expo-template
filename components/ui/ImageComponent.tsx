import { useTheme } from "@/hooks/useTheme";
import React, { useMemo, useState } from "react";
import {
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import IconComponent from "./IconComponent";
import LoadingComponent from "./LoadingComponent";

export interface ImageComponentProps extends Omit<ImageProps, "style"> {
  /**
   * Custom styles for the image container
   */
  containerStyle?: ViewStyle;

  /**
   * Custom styles for the image
   */
  imageStyle?: ImageStyle;

  /**
   * Whether to show a loading indicator while the image loads
   * @default true
   */
  showLoading?: boolean;

  /**
   * Whether to show an error state if the image fails to load
   * @default true
   */
  showError?: boolean;

  /**
   * Size of the error icon
   * @default 24
   */
  errorIconSize?: number;

  /**
   * Color of the error icon
   * @default **`colors.error`**
   */
  errorIconColor?: string;
}

/**
 * An enhanced image component with loading and error states.
 *
 * ## Features
 * - **Loading States**: Built-in loading indicator with customizable display
 * - **Error Handling**: Graceful error states with custom icons
 * - **Flexible Styling**: Custom container and image styles
 * - **Performance Optimized**: Efficient image loading and caching
 * - **Type Safety**: TypeScript validates all image sources and props
 * - **Fallback Support**: Error icon when image fails to load
 *
 * ## States
 * - **Loading**: Shows spinner while image loads
 * - **Loaded**: Displays the image normally
 * - **Error**: Shows error icon when loading fails
 *
 * @example
 * ```tsx
 * // Basic image with default loading/error states
 * <ImageComponent
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   style={{ width: 200, height: 200 }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Image with custom loading and error handling
 * <ImageComponent
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   showLoading={true}
 *   showError={true}
 *   errorIconSize={32}
 *   errorIconColor="#FF0000"
 *   containerStyle={{ borderRadius: 8 }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Local image with custom styling
 * <ImageComponent
 *   source={require('../../assets/images/logo.png')}
 *   style={{ width: 150, height: 150 }}
 *   imageStyle={{ borderRadius: 75 }}
 *   showLoading={false}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Image with custom container styling
 * <ImageComponent
 *   source={{ uri: 'https://example.com/avatar.jpg' }}
 *   style={{ width: 100, height: 100 }}
 *   containerStyle={{
 *     borderRadius: 50,
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 2 },
 *     shadowOpacity: 0.25,
 *     shadowRadius: 3.84,
 *     elevation: 5
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Image with disabled error handling
 * <ImageComponent
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   showError={false}
 *   showLoading={true}
 *   style={{ width: 300, height: 200 }}
 * />
 * ```
 */
export default function ImageComponent({
  containerStyle,
  imageStyle,
  showLoading = true,
  showError = true,
  errorIconSize = 24,
  errorIconColor,
  ...restProps
}: ImageComponentProps) {
  const { colors } = useTheme();
  const resolvedErrorIconColor = errorIconColor ?? colors.error;

  const overlayStyles = useMemo(
    () =>
      StyleSheet.create({
        loadingContainer: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: colors.surface,
          opacity: 0.75,
          alignItems: "center",
          justifyContent: "center",
        },
        errorContainer: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: colors.backgroundSecondary,
          alignItems: "center",
          justifyContent: "center",
        },
      }),
    [colors.backgroundSecondary, colors.surface],
  );

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        style={[styles.image, imageStyle]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...restProps}
      />
      {isLoading && showLoading && (
        <View style={overlayStyles.loadingContainer}>
          <LoadingComponent size="small" />
        </View>
      )}
      {hasError && showError && (
        <View style={overlayStyles.errorContainer}>
          <IconComponent
            library="Ionicons"
            name="image-outline"
            size={errorIconSize}
            color={resolvedErrorIconColor}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
