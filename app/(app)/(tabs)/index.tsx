import { PressableComponent, TextInputComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function TabOneScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { success } = useToast();
  const signOut = useAuthStore((s) => s.signOut);
  const updateDisplayName = useAuthStore((s) => s.updateDisplayName);
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState("");

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const onSave = () => {
    updateDisplayName(name);
    success("Saved", "Display name updated for this session.");
  };

  const onSignOut = () => {
    signOut();
    router.replace("/(auth)/login");
  };

  return (
    <Screen
      safeAreaEdges={["top"]}
      withDefaultPadding={false}
      footer={
        <View style={{ gap: 8, padding: 16 }}>
          <PressableComponent
            buttonText="Save"
            onPress={onSave}
          />
          <PressableComponent
            variant="secondary"
            buttonText="Sign out"
            onPress={onSignOut}
          />
        </View>
      }
    >
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent size="xl" weight="bold" color={colors.text}>
          Welcome{user?.name ? `, ${user.name}` : ""}
        </TextComponent>
        <TextComponent size="base" color={colors.text}>
          {
            "This is your starting screen. Replace this content with your app's home view."
          }
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Use the bottom tab bar (Home · Two · Components · Store · Querying) to
          move around this template. Save only updates your display name above —
          it does not change screens.
        </TextComponent>
        <TextInputComponent
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <PressableComponent
          variant="secondary"
          buttonText="Open components gallery"
          onPress={() => router.push("./components")}
        />
      </View>
    </Screen>
  );
}
