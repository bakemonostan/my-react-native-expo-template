import FileUploadComponent from "@/components/ui/FileUploadComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function FileUploadExample() {
  const { colors } = useTheme();
  const [uri, setUri] = useState<string | undefined>();

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 16 }}>
        <TextComponent size="lg" weight="bold">
          File upload
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Opens the photo library (expo-image-picker). Grant permission when prompted.
        </TextComponent>
        <FileUploadComponent
          value={uri}
          onFileSelect={(u) => setUri(u)}
          message="Tap to pick an image"
        />
      </View>
    </Screen>
  );
}
