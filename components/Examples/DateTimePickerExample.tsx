import DateTimePickerField from "@/components/ui/DateTimePickerField";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import { View } from "react-native";

export default function DateTimePickerExample() {
  const { colors } = useTheme();
  const [date, setDate] = useState(() => new Date());
  const [time, setTime] = useState(() => {
    const d = new Date();
    d.setHours(9, 30, 0, 0);
    return d;
  });
  const [bounded, setBounded] = useState(() => new Date());

  const min = new Date();
  min.setDate(min.getDate() - 2);
  const max = new Date();
  max.setDate(max.getDate() + 14);

  return (
    <Screen safeAreaEdges={["bottom"]}>
      <View style={{ gap: 28 }}>
        <TextComponent size="lg" weight="bold">
          Date & time
        </TextComponent>
        <TextComponent size="sm" color={colors.textSecondary}>
          Native pickers from @react-native-community/datetimepicker. On web,
          fields show a short notice.
        </TextComponent>

        <DateTimePickerField
          label="Date"
          mode="date"
          value={date}
          onChange={setDate}
        />

        <DateTimePickerField
          label="Time"
          mode="time"
          value={time}
          onChange={setTime}
        />

        <DateTimePickerField
          label="Date (min / max)"
          mode="date"
          value={bounded}
          onChange={setBounded}
          minimumDate={min}
          maximumDate={max}
        />

        <DateTimePickerField
          label="With error"
          mode="date"
          value={date}
          onChange={setDate}
          error="Example validation message."
        />
      </View>
    </Screen>
  );
}
