import { isAuthenticated, tokenUtils } from "@/api/api.utils";
import { fetchSessionUser } from "@/services/authBackend";
import { useAuthStore } from "@/store/authStore";

/**
 * After Zustand rehydrates: align SecureStore token with persisted `user`
 * and optionally restore `user` from `/auth/me` when using API mode.
 */
export async function syncSecureSessionWithStore(): Promise<void> {
  const { user, signOut } = useAuthStore.getState();
  const hasToken = await isAuthenticated();

  if (user && !hasToken) {
    await signOut();
    return;
  }

  if (!user && hasToken) {
    const restored = await fetchSessionUser();
    if (restored) {
      useAuthStore.setState({ user: restored });
    } else {
      await tokenUtils.clearToken();
    }
  }
}
