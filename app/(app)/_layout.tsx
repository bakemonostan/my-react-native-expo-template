import { useAuthStore } from "@/store/authStore";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

/**
 * Authenticated area: tabs and other app routes live under `(app)`.
 * If the session is missing, redirect to login (see Expo Router “protected” patterns:
 * https://docs.expo.dev/router/advanced/protected/ ).
 */
export default function AppGroupLayout() {
  const { colors } = useTheme();
  const hydrated = useAuthStore((s) => s.hydrated);
  const isLoggedIn = useAuthStore((s) => s.user !== null);

  if (!hydrated) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
