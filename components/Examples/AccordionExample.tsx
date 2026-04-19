import { AccordionComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function AccordionExample() {
  const { colors } = useTheme();

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 24 }}>
        <TextComponent size="lg" weight="bold">
          Accordion
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Multiple sections can be open, or use single-open mode for FAQs.
        </TextComponent>

        <AccordionComponent
          singleOpen
          items={[
            {
              key: "1",
              title: "What is this template?",
              content:
                "A React Native + Expo starter with shared UI primitives, theming, and example screens.",
            },
            {
              key: "2",
              title: "How do I change the theme?",
              content:
                "Use ThemeProvider and useTheme(); semantic colors live in constants/Colors.ts.",
            },
            {
              key: "3",
              title: "Custom content",
              content: (
                <View style={{ paddingVertical: 4, gap: 6 }}>
                  <TextComponent size="sm" color={colors.text}>
                    Nodes work as accordion body content too.
                  </TextComponent>
                </View>
              ),
              defaultOpen: true,
            },
          ]}
        />
      </View>
    </Screen>
  );
}
