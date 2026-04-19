import { TextInputComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function TextInputExample() {
  const { colors } = useTheme();
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 20 }}>
        <TextComponent size="lg" weight="bold">
          Text input (raw)
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Theme-aware borders, placeholder, and focus ring. Use Form field when
          you need a label or icons.
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" weight="medium" color={colors.text}>
            Default
          </TextComponent>
          <TextInputComponent
            placeholder="Type something…"
            value={a}
            onChangeText={setA}
          />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" weight="medium" color={colors.text}>
            With error
          </TextComponent>
          <TextInputComponent
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={b}
            onChangeText={setB}
            error={
              b.length > 0 && !b.includes("@")
                ? "Enter a valid email address."
                : undefined
            }
          />
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" weight="medium" color={colors.text}>
            Multiline
          </TextComponent>
          <TextInputComponent
            placeholder="Notes…"
            multiline
            numberOfLines={4}
            inputStyle={{ minHeight: 100, textAlignVertical: "top" }}
          />
        </View>
      </View>
    </Screen>
  );
}
