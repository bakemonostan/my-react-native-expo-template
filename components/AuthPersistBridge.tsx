import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

/**
 * Marks `useAuthStore` as hydrated after Zustand `persist` finishes rehydrating from AsyncStorage.
 * Mount once under `QueryClientProvider` (see `app/_layout.tsx`).
 */
export function AuthPersistBridge() {
  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      useAuthStore.setState({ hydrated: true });
    });
    if (useAuthStore.persist.hasHydrated()) {
      useAuthStore.setState({ hydrated: true });
    }
    return unsub;
  }, []);
  return null;
}
