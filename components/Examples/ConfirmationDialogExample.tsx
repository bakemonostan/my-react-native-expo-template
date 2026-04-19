import { ConfirmationDialog } from "@/components/ui";
import PressableComponent from "@/components/ui/PressableComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function ConfirmationDialogExample() {
  const { colors } = useTheme();
  const [standardOpen, setStandardOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          Confirmation dialog
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Modal for important or destructive actions.
        </TextComponent>

        <View style={{ gap: 10 }}>
          <PressableComponent
            buttonText="Open standard confirm"
            variant="primary"
            onPress={() => setStandardOpen(true)}
          />
          <PressableComponent
            buttonText="Open destructive confirm"
            variant="outline"
            onPress={() => setDestructiveOpen(true)}
          />
          <PressableComponent
            buttonText="Open with loading confirm"
            variant="secondary"
            onPress={() => setLoadingOpen(true)}
          />
        </View>
      </View>

      <ConfirmationDialog
        visible={standardOpen}
        title="Submit application"
        message="Are you sure you want to submit? You cannot edit after submission."
        confirmLabel="Submit"
        onConfirm={() => setStandardOpen(false)}
        onCancel={() => setStandardOpen(false)}
      />

      <ConfirmationDialog
        visible={destructiveOpen}
        title="Delete item"
        message="This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => setDestructiveOpen(false)}
        onCancel={() => setDestructiveOpen(false)}
      />

      <ConfirmationDialog
        visible={loadingOpen}
        title="Processing"
        message="Confirm to simulate a slow request."
        confirmLabel="Continue"
        loading={loading}
        onConfirm={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setLoadingOpen(false);
          }, 1500);
        }}
        onCancel={() => {
          setLoading(false);
          setLoadingOpen(false);
        }}
      />
    </Screen>
  );
}
