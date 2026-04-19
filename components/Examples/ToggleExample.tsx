import { Checkbox, Radio, Switch } from "@/components/Toggle";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function ToggleExample() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [plan, setPlan] = useState<"basic" | "pro">("basic");

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
        <TextComponent size="lg" weight="bold">
          Toggles
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent weight="medium" size="sm" color={colors.textSecondary}>
            Switch
          </TextComponent>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            label="Push notifications"
          />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent weight="medium" size="sm" color={colors.textSecondary}>
            Checkbox
          </TextComponent>
          <Checkbox
            value={accepted}
            onValueChange={setAccepted}
            label="I agree to the terms"
          />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent weight="medium" size="sm" color={colors.textSecondary}>
            Radio group
          </TextComponent>
          <Radio
            value={plan === "basic"}
            onValueChange={() => setPlan("basic")}
            label="Basic"
          />
          <Radio
            value={plan === "pro"}
            onValueChange={() => setPlan("pro")}
            label="Pro"
          />
        </View>
      </View>
    </Screen>
  );
}
