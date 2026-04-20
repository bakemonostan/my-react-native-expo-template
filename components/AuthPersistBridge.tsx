import { syncSecureSessionWithStore } from "@/services/sessionSync";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef } from "react";

/**
 * After Zustand persist rehydrates, syncs SecureStore ↔ session, then sets `hydrated`.
 * Mount once under `QueryClientProvider` (see `app/_layout.tsx`).
 */
export function AuthPersistBridge() {
  const bootStarted = useRef(false);

  useEffect(() => {
    async function boot() {
      if (bootStarted.current) return;
      bootStarted.current = true;
      await syncSecureSessionWithStore();
      useAuthStore.setState({ hydrated: true });
    }

    const unsub = useAuthStore.persist.onFinishHydration(() => {
      void boot();
    });

    if (useAuthStore.persist.hasHydrated()) {
      void boot();
    }

    return unsub;
  }, []);
  return null;
}
