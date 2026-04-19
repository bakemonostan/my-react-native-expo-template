import { EmptyState } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function EmptyStateExample() {
  const { colors } = useTheme();

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 32 }}>
        <TextComponent size="lg" weight="bold">
          Empty state
        </TextComponent>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            Basic (icon + copy)
          </TextComponent>
          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingVertical: 24,
            }}
          >
            <EmptyState
              title="No results"
              description="Try another search or clear your filters."
              icon={{ name: "search-outline", library: "Ionicons" }}
            />
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <TextComponent size="sm" color={colors.textSecondary}>
            With action
          </TextComponent>
          <View
            style={{
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.border,
              paddingVertical: 24,
            }}
          >
            <EmptyState
              title="Nothing here yet"
              description="Import a file to get started."
              icon={{ name: "cloud-upload-outline", library: "Ionicons" }}
              actionLabel="Import"
              onAction={() => {}}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}
