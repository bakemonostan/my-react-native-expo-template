import { AuthHeader } from "@/components/auth/AuthHeader";
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const hydrated = useAuthStore((s) => s.hydrated);
  const isLoggedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      router.replace("/(app)/(tabs)");
    }
  }, [hydrated, isLoggedIn, router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    if (!email.trim() || !password) return;
    signIn(email.trim(), password);
    router.replace("/(app)/(tabs)");
  };

  return (
    <Screen
      header={<AuthHeader title="Sign in" showBack={false} />}
      safeAreaEdges={["top", "bottom"]}
      withDefaultPadding
    >
      <View style={styles.container}>
        <TextComponent size="sm" color={colors.textSecondary} style={{ lineHeight: 20 }}>
          Template mock: any non-empty password signs you in. Wire `signIn` in
          `store/authStore.ts` to your API.
        </TextComponent>
        <FormField
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FormField
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PressableComponent buttonText="Sign in" onPress={onSubmit} />
        <Link href="/(auth)/forgot-password" asChild>
          <Pressable>
            <TextComponent size="sm" color={colors.primary}>
              Forgot password?
            </TextComponent>
          </Pressable>
        </Link>
        <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            No account?
          </TextComponent>
          <Link href="/(auth)/register">
            <TextComponent size="sm" color={colors.primary}>
              Register
            </TextComponent>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingTop: 24,
  },
});
