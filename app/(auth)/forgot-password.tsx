import { AuthHeader } from "@/components/auth/AuthHeader";
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { backendRequestPasswordReset } from "@/services/authBackend";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { info, error: showError } = useToast();
  const router = useRouter();
  const setPendingOtpEmail = useAuthStore((s) => s.setPendingOtpEmail);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await backendRequestPasswordReset(email.trim());
      if (!res.ok) {
        showError("Request failed", res.message);
        return;
      }
      setPendingOtpEmail(email.trim());
      info("Next step", "Open the verify screen and enter your code.");
      router.push("/(auth)/verify-otp");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen
      header={<AuthHeader title={t("auth_forgot_title")} />}
      safeAreaEdges={["top", "bottom"]}
      withDefaultPadding
    >
      <View style={styles.container}>
        <TextComponent size="sm" color={colors.textSecondary} style={{ lineHeight: 20 }}>
          {t("auth_forgot_blurb")}
        </TextComponent>
        <FormField
          label={t("auth_forgot_email")}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <PressableComponent
          buttonText={t("auth_forgot_submit")}
          onPress={onSubmit}
          loading={submitting}
          disabled={submitting}
        />
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
