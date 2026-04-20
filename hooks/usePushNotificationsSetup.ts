import { featureFlags } from "@/config/featureFlags";
import { setupPushNotifications } from "@/services/pushNotifications";
import { useEffect } from "react";

/** Registers push permission + logs native token in __DEV__ when `EXPO_PUBLIC_PUSH_SETUP=1`. */
export function usePushNotificationsSetup(): void {
  useEffect(() => {
    if (!featureFlags.enablePushSetup) return;
    void setupPushNotifications();
  }, []);
}
