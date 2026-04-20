import { mScale } from '@/constants/mixins';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

/**
 * Dashed “drop zone” that opens the image library (see **`expo-image-picker`**), enforces **`maxFileSize`**,
 * and reports selection via **`onFileSelect`**. Shows a thumbnail when a file is chosen.
 *
 * @example Persist URI in parent state
 * ```tsx
 * import FileUploadComponent from "@/components/ui/FileUploadComponent";
 * import { useState } from "react";
 *
 * function Profile() {
 *   const [uri, setUri] = useState<string | undefined>();
 *   return (
 *     <FileUploadComponent
 *       value={uri}
 *       onFileSelect={(u) => setUri(u)}
 *       message="Upload a profile photo"
 *     />
 *   );
 * }
 * ```
 *
 * @example Custom copy
 * ```tsx
 * <FileUploadComponent
 *   subtitle="PNG or JPG only"
 *   maxFileSize={2 * 1024 * 1024}
 *   onError={(msg) => console.warn(msg)}
 * />
 * ```
 */
export interface FileUploadProps {
  onFileSelect?: (uri: string, fileName: string) => void;
  onError?: (error: string) => void;
  maxFileSize?: number;
  style?: ViewStyle;
  value?: string;
  message?: string;
  subtitle?: string;
}

export default function FileUploadComponent({
  onFileSelect,
  onError,
  maxFileSize = 5 * 1024 * 1024,
  style,
  value,
  message = 'Tap to upload your document',
  subtitle,
}: FileUploadProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          borderWidth: 2,
          borderColor: colors.palette.primary200,
          borderRadius: mScale(16),
          paddingVertical: mScale(40),
          paddingHorizontal: mScale(24),
          backgroundColor: colors.palette.primary100,
          borderStyle: 'dashed',
        },
        content: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        previewImage: {
          width: mScale(120),
          height: mScale(120),
          borderRadius: mScale(12),
          marginBottom: mScale(16),
          resizeMode: 'cover',
        },
        iconContainer: {
          marginBottom: mScale(20),
        },
        iconBg: {
          width: mScale(64),
          height: mScale(64),
          borderRadius: mScale(32),
          backgroundColor: colors.palette.primary200,
          justifyContent: 'center',
          alignItems: 'center',
        },
        successBg: {
          backgroundColor: colors.palette.success100,
        },
        title: {
          fontSize: mScale(16),
          fontWeight: '600',
          color: colors.text,
          marginBottom: mScale(8),
          textAlign: 'center',
        },
        subtitle: {
          fontSize: mScale(13),
          color: colors.textSecondary,
          textAlign: 'center',
          marginBottom: mScale(4),
        },
        tapToChange: {
          fontSize: mScale(12),
          color: colors.primary,
          textAlign: 'center',
          marginTop: mScale(4),
        },
      }),
    [colors],
  );

  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [fileUri, setFileUri] = useState<string | undefined>(value);
  const scale = useSharedValue(1);

  const handlePress = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        if (permissionResult.canAskAgain) {
          Alert.alert(
            'Permission Required',
            'Please allow access to your photo library to upload documents.',
            [{ text: 'OK' }],
          );
        } else {
          Alert.alert(
            'Permission Required',
            'Photo library access was denied. Please enable it in your device settings to upload documents.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('app-settings:');
                  } else {
                    Linking.openSettings();
                  }
                },
              },
            ],
          );
        }
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        if (asset.fileSize != null && asset.fileSize > maxFileSize) {
          onError?.(
            `File is too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB.`,
          );
          return;
        }
        const uri = asset.uri;
        const name = asset.fileName ?? 'image.jpg';
        setFileUri(uri);
        setFileName(name);
        onFileSelect?.(uri, name);
      }
    } catch {
      onError?.('Something went wrong while picking the file.');
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const maxSizeMB = Math.round(maxFileSize / 1024 / 1024);
  const displayFileName = fileName || (value ? 'Document selected' : undefined);
  const defaultSubtitle = `Formats: JPG, PNG, PDF • Max: ${maxSizeMB}MB`;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.7}>
      <Animated.View style={[styles.content, animatedStyle]}>
        {!displayFileName ? (
          <>
            <View style={styles.iconContainer}>
              <View style={styles.iconBg}>
                <Ionicons
                  name='cloud-upload-outline'
                  size={32}
                  color={colors.primary}
                />
              </View>
            </View>
            <Text style={styles.title}>{message}</Text>
            <Text style={styles.subtitle}>{subtitle || defaultSubtitle}</Text>
          </>
        ) : (
          <>
            {fileUri && (
              <Image
                source={{ uri: fileUri }}
                style={styles.previewImage}
              />
            )}
            <View style={styles.iconContainer}>
              <View style={[styles.iconBg, styles.successBg]}>
                <Ionicons
                  name='checkmark-circle'
                  size={32}
                  color={colors.success}
                />
              </View>
            </View>
            <Text style={styles.title}>File selected!</Text>
            <Text style={styles.subtitle}>{displayFileName}</Text>
            <Text style={styles.tapToChange}>Tap to change</Text>
          </>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
