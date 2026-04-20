import { PressableComponent, TextInputComponent } from "@/components/ui";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useI18n } from "@/context/I18nContext";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function TabOneScreen() {
  const { colors } = useTheme();
  const { t } = useI18n();
  const router = useRouter();
  const { success } = useToast();
  const signOut = useAuthStore((s) => s.signOut);
  const updateDisplayName = useAuthStore((s) => s.updateDisplayName);
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const onSave = () => {
    updateDisplayName(name);
    success("Saved", "Display name updated for this session.");
  };

  const onSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
      router.replace("/(auth)/login");
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <Screen
      safeAreaEdges={["top"]}
      withDefaultPadding={false}
      footer={
        <View style={{ gap: 8, padding: 16 }}>
          <PressableComponent buttonText="Save" onPress={onSave} />
          <PressableComponent
            variant="secondary"
            buttonText="Sign out"
            onPress={onSignOut}
            loading={signingOut}
            disabled={signingOut}
          />
        </View>
      }
    >
      <View style={{ gap: 16, padding: 16 }}>
        <TextComponent size="xl" weight="bold" color={colors.text}>
          {user?.name ? `${t("home_welcome")}, ${user.name}` : t("home_welcome")}
        </TextComponent>
        <TextComponent size="base" color={colors.text}>
          {t("home_body")}
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          {t("home_tabs_hint")}
        </TextComponent>
        <TextInputComponent
          placeholder={t("home_name_placeholder")}
          value={name}
          onChangeText={setName}
        />
        <PressableComponent
          variant="secondary"
          buttonText={t("home_open_components")}
          onPress={() => router.push("./components")}
        />
      </View>
    </Screen>
  );
}
