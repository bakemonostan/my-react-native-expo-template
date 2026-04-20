import { AuthHeader } from "@/components/auth/AuthHeader";
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function RegisterScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { error: showError } = useToast();
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password || submitting) return;
    setSubmitting(true);
    try {
      const res = await register(email.trim(), password, name.trim());
      if (!res.ok) {
        showError("Registration failed", res.message);
        return;
      }
      router.replace("/(app)/(tabs)");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen
      header={<AuthHeader title={t("auth_register_title")} />}
      safeAreaEdges={["top", "bottom"]}
      withDefaultPadding
    >
      <View style={styles.container}>
        <TextComponent size="sm" color={colors.textSecondary} style={{ lineHeight: 20 }}>
          {t("auth_register_blurb")}
        </TextComponent>
        <FormField
          label={t("auth_register_name")}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />
        <FormField
          label={t("auth_register_email")}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <FormField
          label={t("auth_register_password")}
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PressableComponent
          buttonText={t("auth_register_submit")}
          onPress={onSubmit}
          loading={submitting}
          disabled={submitting}
        />
        <Link href="/(auth)/login">
          <TextComponent size="sm" color={colors.primary}>
            {t("auth_register_has_account")}
          </TextComponent>
        </Link>
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
