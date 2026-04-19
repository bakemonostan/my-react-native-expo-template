import { ChipComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function ChipExample() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string | null>("soft");
  const [tags, setTags] = useState(["React", "Expo", "TypeScript"]);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
        <TextComponent size="lg" weight="bold">
          Chips
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Variants (tap to select)
          </TextComponent>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {(["soft", "outlined", "filled"] as const).map((v) => (
              <ChipComponent
                key={v}
                label={v}
                variant={v}
                selected={selected === v}
                onPress={() => setSelected(v)}
              />
            ))}
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            With icon
          </TextComponent>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            <ChipComponent
              label="Notifications"
              icon={{ name: "notifications-outline", library: "Ionicons" }}
              selected
            />
            <ChipComponent
              label="Starred"
              variant="outlined"
              icon={{ name: "star", library: "Ionicons" }}
            />
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Dismissible
          </TextComponent>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {tags.map((t) => (
              <ChipComponent
                key={t}
                label={t}
                dismissible
                onDismiss={() =>
                  setTags((prev) => prev.filter((x) => x !== t))
                }
              />
            ))}
          </View>
        </View>
      </View>
    </Screen>
  );
}
