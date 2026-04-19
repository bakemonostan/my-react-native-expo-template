import { Screen } from "@/components/ui/Screen";
import TextAreaComponent from "@/components/ui/TextAreaComponent";
import TextComponent from "@/components/ui/TextComponent";
import React, { useState } from "react";
import { View } from "react-native";

export default function TextAreaExample() {
  const [notes, setNotes] = useState("");
  const [bio, setBio] = useState("");

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 20 }}>
        <TextComponent size="lg" weight="bold">
          Text area
        </TextComponent>

        <TextAreaComponent
          label="Notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="Write something…"
          maxLength={120}
          showCharacterCount
        />

        <TextAreaComponent
          label="Bio (validation)"
          value={bio}
          onChangeText={setBio}
          error={bio.length > 0 && bio.length < 10 ? "At least 10 characters" : undefined}
        />
      </View>
    </Screen>
  );
}
