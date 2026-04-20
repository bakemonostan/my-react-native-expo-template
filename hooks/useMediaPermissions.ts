/**
 * Camera and photo library permission state built on Expo ImagePicker’s official permission hooks.
 *
 * @packageDocumentation
 */

import { featureFlags } from "@/config/featureFlags";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";

/** Re-export of Expo’s permission status union for typed consumers. */
export type MediaPermissionStatus = ImagePicker.PermissionStatus;

/**
 * Combined camera + library permission API returned by {@link useMediaPermissions}.
 */
export interface UseMediaPermissionsResult {
  /** Latest camera permission status, or `null` before the first Expo response. */
  camera: MediaPermissionStatus | null;
  /** Latest media library permission status, or `null` before the first Expo response. */
  library: MediaPermissionStatus | null;
  /** `true` while either underlying hook has not yet returned an initial result. */
  isBusy: boolean;
  /** Re-queries both permissions without showing a system prompt (Expo `get*` paths). */
  refresh: () => Promise<void>;
  /** Prompts for camera if needed; resolves `true` if `granted`. */
  requestCamera: () => Promise<boolean>;
  /** Prompts for library access if needed; resolves `true` if `granted`. */
  requestLibrary: () => Promise<boolean>;
  /** Convenience: `cameraResp?.granted === true`. */
  cameraGranted: boolean;
  /** Convenience: `libraryResp?.granted === true`. */
  libraryGranted: boolean;
}

/**
 * Bundles `ImagePicker.useCameraPermissions` and `ImagePicker.useMediaLibraryPermissions`.
 * Use `request*` before `launchCameraAsync` / `launchImageLibraryAsync`.
 *
 * @returns Permission fields, busy flag, `refresh`, and `request*` helpers.
 *
 * @see {@link https://docs.expo.dev/versions/latest/sdk/imagepicker/ | Expo ImagePicker}
 *
 * @example
 * ```tsx
 * import * as ImagePicker from "expo-image-picker";
 * import { useMediaPermissions } from "@/hooks";
 *
 * const { libraryGranted, requestLibrary, isBusy } = useMediaPermissions();
 *
 * const pickImage = async () => {
 *   if (!libraryGranted) {
 *     const ok = await requestLibrary();
 *     if (!ok) return;
 *   }
 *   await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] });
 * };
 * ```
 */
function useMediaPermissionsCore(): UseMediaPermissionsResult {
  const [cameraResp, requestCameraExpo, getCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [libraryResp, requestLibraryExpo, getLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const requestCamera = useCallback(async () => {
    const r = await requestCameraExpo();
    return r.granted;
  }, [requestCameraExpo]);

  const requestLibrary = useCallback(async () => {
    const r = await requestLibraryExpo();
    return r.granted;
  }, [requestLibraryExpo]);

  const refresh = useCallback(async () => {
    await Promise.all([getCameraPermission(), getLibraryPermission()]);
  }, [getCameraPermission, getLibraryPermission]);

  const camera = cameraResp?.status ?? null;
  const library = libraryResp?.status ?? null;
  const isBusy = cameraResp === null || libraryResp === null;

  return {
    camera,
    library,
    isBusy,
    refresh,
    requestCamera,
    requestLibrary,
    cameraGranted: cameraResp?.granted ?? false,
    libraryGranted: libraryResp?.granted ?? false,
  };
}

const OFF_MEDIA: UseMediaPermissionsResult = {
  camera: null,
  library: null,
  isBusy: false,
  refresh: async () => {},
  requestCamera: async () => false,
  requestLibrary: async () => false,
  cameraGranted: false,
  libraryGranted: false,
};

export function useMediaPermissions(): UseMediaPermissionsResult {
  const core = useMediaPermissionsCore();
  if (!featureFlags.enableMediaPermissions) return OFF_MEDIA;
  return core;
}
