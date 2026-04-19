import { OTPInput } from "@/components/ui";
import PressableComponent from "@/components/ui/PressableComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function OTPInputExample() {
  const { colors } = useTheme();
  const [showError, setShowError] = useState(false);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 28 }}>
        <TextComponent size="lg" weight="bold">
          OTP input
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            6-digit code
          </TextComponent>
          <OTPInput
            length={6}
            onComplete={() => {}}
            onChange={() => {}}
            error={showError ? "Invalid code — try again." : undefined}
          />
        </View>

        <PressableComponent
          buttonText={showError ? "Clear error" : "Show error state"}
          variant="outline"
          onPress={() => setShowError((e) => !e)}
        />

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            4-digit PIN (masked)
          </TextComponent>
          <OTPInput length={4} secure onComplete={() => {}} />
        </View>
      </View>
    </Screen>
  );
}
