import AlertComponent from "@/components/ui/AlertComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View } from "react-native";

export default function AlertExample() {
  const { colors } = useTheme();
  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Alert Component
        </TextComponent>

        <AlertComponent
          variant="info"
          title="Information"
          message="This is an info alert with a title and icon."
        />

        <AlertComponent
          variant="success"
          title="Success!"
          message="Operation completed successfully."
        />

        <AlertComponent
          variant="warning"
          title="Warning"
          message="Please review your changes before proceeding."
        />

        <AlertComponent
          variant="error"
          title="Error"
          message="Something went wrong. Please try again."
        />

        <AlertComponent
          variant="info"
          message="This is a simple alert without a title."
          backgroundColor={colors.palette.primary100}
          textColor={colors.palette.primary900}
          borderColor={colors.palette.primary300}
        />
      </View>
    </Screen>
  );
}
