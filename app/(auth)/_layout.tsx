import { useTheme } from "@/hooks/useTheme";
import { Stack } from "expo-router";

/**
 * Unauthenticated stack: login, register, password reset, OTP verify.
 * Native stack headers are off; each screen uses {@link AuthHeader} in `Screen`’s `header` slot.
 */
export default function AuthLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Sign in" }} />
      <Stack.Screen name="register" options={{ title: "Create account" }} />
      <Stack.Screen name="forgot-password" options={{ title: "Forgot password" }} />
      <Stack.Screen name="verify-otp" options={{ title: "Verify code" }} />
    </Stack>
  );
}
