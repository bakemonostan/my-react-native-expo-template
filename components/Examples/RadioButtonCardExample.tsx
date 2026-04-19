import RadioButtonCard from "@/components/ui/RadioButtonCard";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function RadioButtonCardExample() {
  const { colors } = useTheme();
  const [plan, setPlan] = useState("pro");

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Radio cards
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Plan tiles follow the theme. Selected: {plan}
        </TextComponent>

        <RadioButtonCard value="basic" selectedValue={plan} onSelect={setPlan}>
          <View style={{ gap: 4 }}>
            <TextComponent weight="bold" color={colors.text}>
              Basic
            </TextComponent>
            <TextComponent size="sm" color={colors.textSecondary}>
              Essential features
            </TextComponent>
          </View>
        </RadioButtonCard>

        <RadioButtonCard value="pro" selectedValue={plan} onSelect={setPlan}>
          <View style={{ gap: 4 }}>
            <TextComponent weight="bold" color={colors.text}>
              Pro
            </TextComponent>
            <TextComponent size="sm" color={colors.textSecondary}>
              Everything included
            </TextComponent>
          </View>
        </RadioButtonCard>
      </View>
    </Screen>
  );
}
