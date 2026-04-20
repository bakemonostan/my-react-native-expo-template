/**
 * Local push permission + native device token (no EAS required).
 * For FCM/APNs-backed flows, send `data` from your backend using the logged token shape.
 */
import { featureFlags } from "@/config/featureFlags";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

if (Platform.OS !== "web") {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function setupPushNotifications(): Promise<void> {
  if (!featureFlags.enablePushSetup || Platform.OS === "web") {
    return;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let final = existing;
  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    final = status;
  }
  if (final !== "granted") {
    if (__DEV__) {
      console.warn("[push] notification permission not granted");
    }
    return;
  }

  try {
    const native = await Notifications.getDevicePushTokenAsync();
    if (__DEV__) {
      console.log("[push] native token type:", native.type);
      console.log("[push] native token (truncated):", String(native.data).slice(0, 48) + "…");
    }
  } catch (e) {
    if (__DEV__) {
      console.warn("[push] could not read device push token (simulator is common):", e);
    }
  }
}
