import { AuthHeader } from "@/components/auth/AuthHeader";
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { error: showError } = useToast();
  const router = useRouter();
  const hydrated = useAuthStore((s) => s.hydrated);
  const isLoggedIn = useAuthStore((s) => s.user !== null);
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (hydrated && isLoggedIn) {
      router.replace("/(app)/(tabs)");
    }
  }, [hydrated, isLoggedIn, router]);

  const onSubmit = async () => {
    if (!email.trim() || !password || submitting) return;
    setSubmitting(true);
    try {
      const res = await signIn(email.trim(), password);
      if (!res.ok) {
        showError("Sign in failed", res.message);
        return;
      }
      router.replace("/(app)/(tabs)");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen
      header={<AuthHeader title={t("auth_login_title")} showBack={false} />}
      safeAreaEdges={["top", "bottom"]}
      withDefaultPadding
    >
      <View style={styles.container}>
        <TextComponent size="sm" color={colors.textSecondary} style={{ lineHeight: 20 }}>
          {t("auth_login_blurb")}
        </TextComponent>
        <FormField
          label={t("auth_login_email")}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FormField
          label={t("auth_login_password")}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PressableComponent
          buttonText={t("auth_login_submit")}
          onPress={onSubmit}
          loading={submitting}
          disabled={submitting}
        />
        <Link href="/(auth)/forgot-password" asChild>
          <Pressable>
            <TextComponent size="sm" color={colors.primary}>
              {t("auth_login_forgot")}
            </TextComponent>
          </Pressable>
        </Link>
        <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            {t("auth_login_no_account")}
          </TextComponent>
          <Link href="/(auth)/register">
            <TextComponent size="sm" color={colors.primary}>
              {t("auth_login_register")}
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
