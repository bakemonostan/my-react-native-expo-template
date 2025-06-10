import React, { useState } from "react";
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
   * @default '#FF3B30'
   */
  errorIconColor?: string;
}

/**
 * An enhanced image component with loading and error states
 *
 * @example
 * ```tsx
 * <ImageComponent
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   style={{ width: 200, height: 200 }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ImageComponent
 *   source={{ uri: 'https://example.com/image.jpg' }}
 *   showLoading={true}
 *   showError={true}
 *   errorIconSize={32}
 *   errorIconColor="#FF0000"
 * />
 * ```
 */
export default function ImageComponent({
  containerStyle,
  imageStyle,
  showLoading = true,
  showError = true,
  errorIconSize = 24,
  errorIconColor = "#FF3B30",
  ...restProps
}: ImageComponentProps) {
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
        <View style={styles.loadingContainer}>
          <LoadingComponent size="small" />
        </View>
      )}
      {hasError && showError && (
        <View style={styles.errorContainer}>
          <IconComponent
            name="image"
            library="Feather"
            size={errorIconSize}
            color={errorIconColor}
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
});
