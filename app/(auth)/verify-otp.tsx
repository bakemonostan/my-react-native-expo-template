import { AuthHeader } from "@/components/auth/AuthHeader";
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { featureFlags } from "@/config/featureFlags";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function VerifyOtpScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const router = useRouter();
  const { error: showError } = useToast();
  const pendingOtpEmail = useAuthStore((s) => s.pendingOtpEmail);
  const verifyOtp = useAuthStore((s) => s.verifyOtp);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!pendingOtpEmail) {
      router.replace("/(auth)/forgot-password");
    }
  }, [pendingOtpEmail, router]);

  const onSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await verifyOtp(code);
      if (!res.ok) {
        showError("Verification failed", res.message);
        return;
      }
      router.replace("/(app)/(tabs)");
    } finally {
      setSubmitting(false);
    }
  };

  if (!pendingOtpEmail) {
    return null;
  }

  const blurb =
    featureFlags.authMode === "mock"
      ? t("auth_verify_blurb_mock", { email: pendingOtpEmail })
      : t("auth_verify_blurb_api", { email: pendingOtpEmail });

  return (
    <Screen
      header={<AuthHeader title={t("auth_verify_title")} />}
      safeAreaEdges={["top", "bottom"]}
      withDefaultPadding
    >
      <View style={styles.container}>
        <TextComponent size="sm" color={colors.textSecondary} style={{ lineHeight: 20 }}>
          {blurb}
        </TextComponent>
        <FormField
          label={t("auth_verify_code_label")}
          placeholder="123456"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
        />
        <PressableComponent
          buttonText={t("auth_verify_submit")}
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
