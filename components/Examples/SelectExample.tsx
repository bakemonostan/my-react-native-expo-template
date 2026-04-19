import { SelectComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

const COUNTRIES = [
  { label: "Nigeria", value: "NG" },
  { label: "Ghana", value: "GH" },
  { label: "Kenya", value: "KE", description: "East Africa" },
  { label: "South Africa", value: "ZA" },
];

export default function SelectExample() {
  const { colors } = useTheme();
  const [country, setCountry] = useState<string | undefined>();

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
        <TextComponent size="lg" weight="bold">
          Select
        </TextComponent>

        <SelectComponent
          label="Country"
          placeholder="Choose a country"
          options={COUNTRIES}
          value={country}
          onChange={(v) => setCountry(v as string)}
        />

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Selected value
          </TextComponent>
          <TextComponent size="md" color={colors.text}>
            {country ?? "—"}
          </TextComponent>
        </View>

        <SelectComponent
          label="With error"
          placeholder="Pick one"
          options={COUNTRIES}
          error="This field is required for the demo."
          onChange={() => {}}
        />
      </View>
    </Screen>
  );
}
