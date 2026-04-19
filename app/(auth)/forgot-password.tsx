import { AuthHeader } from "@/components/auth/AuthHeader";
import { FormField, PressableComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { info } = useToast();
  const setPendingOtpEmail = useAuthStore((s) => s.setPendingOtpEmail);
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    if (!email.trim()) return;
    setPendingOtpEmail(email.trim());
    info("Check your inbox (mock)", "Use any 6+ digit code on the next screen.");
    router.push("/(auth)/verify-otp");
  };

  return (
    <Screen
      header={<AuthHeader title="Forgot password" />}
      safeAreaEdges={["top", "bottom"]}
      withDefaultPadding
    >
      <View style={styles.container}>
        <TextComponent size="sm" color={colors.textSecondary} style={{ lineHeight: 20 }}>
          Enter the email for your account. This template only simulates a reset
          flow with OTP.
        </TextComponent>
        <FormField
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <PressableComponent buttonText="Continue" onPress={onSubmit} />
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
