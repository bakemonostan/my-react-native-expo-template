import AlertComponent from "@/components/ui/AlertComponent";
import SafeAreaViewComponent from "@/components/ui/SafeAreaViewComponent";
import TextComponent from "@/components/ui/TextComponent";
import { PresetStyles } from "@/theme/presets";
import React from "react";
import ScrollViewComponent from "../ui/ScrollViewComponent";

export default function AlertExample() {
  return (
    <SafeAreaViewComponent style={PresetStyles.screenContainer}>
      <ScrollViewComponent style={{ gap: 16, padding: 16 }}>
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
          backgroundColor="#E3F2FD"
          textColor="#0D47A1"
          borderColor="#90CAF9"
        />
      </ScrollViewComponent>
    </SafeAreaViewComponent>
  );
}
