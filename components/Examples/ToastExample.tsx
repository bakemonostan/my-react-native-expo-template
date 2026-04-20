import { Screen } from "@/components/ui/Screen";
import PressableComponent from "@/components/ui/PressableComponent";
import TextComponent from "@/components/ui/TextComponent";
import { useToast } from "@/hooks/useToast";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function ToastExample() {
  const { colors } = useTheme();
  const { success, error, info, warning } = useToast();

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Toast
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Uses `useToast` (root layout includes `ToastComponent`).
        </TextComponent>

        <View style={{ gap: 10 }}>
          <PressableComponent
            style={{
              padding: 14,
              borderRadius: 10,
              backgroundColor: colors.success,
              alignItems: "center",
            }}
            onPress={() => success("Saved", "Your changes are synced.")}
          >
            <TextComponent
              weight="medium"
              color={colors.palette.white}>
              Success
            </TextComponent>
          </PressableComponent>

          <PressableComponent
            style={{
              padding: 14,
              borderRadius: 10,
              backgroundColor: colors.error,
              alignItems: "center",
            }}
            onPress={() => error("Something failed", "Check connection.")}
          >
            <TextComponent
              weight="medium"
              color={colors.palette.white}>
              Error
            </TextComponent>
          </PressableComponent>

          <PressableComponent
            style={{
              padding: 14,
              borderRadius: 10,
              backgroundColor: colors.primary,
              alignItems: "center",
            }}
            onPress={() => info("Heads up", "This is an info toast.")}
          >
            <TextComponent
              weight="medium"
              color={colors.palette.white}>
              Info
            </TextComponent>
          </PressableComponent>

          <PressableComponent
            style={{
              padding: 14,
              borderRadius: 10,
              backgroundColor: colors.warning,
              alignItems: "center",
            }}
            onPress={() =>
              warning("Careful", "Please review before continuing.")
            }
          >
            <TextComponent weight="medium" color={colors.text}>
              Warning
            </TextComponent>
          </PressableComponent>
        </View>
      </View>
    </Screen>
  );
}
