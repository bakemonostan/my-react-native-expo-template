import { ErrorInfo } from "react";
import { ScrollView, TextStyle, View, ViewStyle } from "react-native";

import IconComponent from "@/components/ui-v2/IconComponent";
import PressableComponent from "@/components/ui-v2/PressableComponent";
import { ScreenV2 } from "@/components/ui-v2/ScreenV2";
import TextComponent from "@/components/ui-v2/TextComponent";

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset(): void;
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <ScreenV2
      scrollable={false}
      safeAreaEdges={["top", "bottom"]}
      backgroundColor="#ffffff"
      bodyStyle={$contentContainer}>
      <View style={$topSection}>
        <IconComponent
          library="MaterialCommunityIcons"
          name="bug"
          size={64}
          color="#DC2626"
        />
        <TextComponent
          weight="semi_bold"
          size="xxl"
          color="#DC2626"
          styles={$heading}>
          Oops! Something went wrong
        </TextComponent>
        <TextComponent
          weight="regular"
          size="base"
          color="#666666">
          We&apos;re sorry for the inconvenience. The error has been logged.
        </TextComponent>
      </View>

      <ScrollView
        style={$errorSection}
        contentContainerStyle={$errorSectionContentContainer}>
        <TextComponent
          weight="bold"
          size="sm"
          color="#DC2626"
          styles={$errorContent}>
          {`${props.error}`.trim()}
        </TextComponent>
        <TextComponent
          weight="regular"
          size="xs"
          color="#999999"
          styles={$errorBacktrace}
          {...{ selectable: true }}>
          {`${props.errorInfo?.componentStack ?? ""}`.trim()}
        </TextComponent>
      </ScrollView>

      <PressableComponent
        variant="primary"
        size="lg"
        buttonText="Try Again"
        labelVariant="body1Bold"
        backgroundColor="#DC2626"
        pressableStyle={$resetButton}
        onPress={props.onReset}
      />
    </ScreenV2>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: 20,
  paddingTop: 24,
  flex: 1,
};

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
};

const $heading: TextStyle = {
  marginBottom: 8,
  textAlign: "center",
};

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: "#F3F4F6",
  marginVertical: 16,
  borderRadius: 8,
  width: "100%",
};

const $errorSectionContentContainer: ViewStyle = {
  padding: 16,
};

const $errorContent: TextStyle = {
  marginBottom: 12,
};

const $errorBacktrace: TextStyle = {
  marginTop: 8,
  lineHeight: 18,
};

const $resetButton: ViewStyle = {
  width: "100%",
  marginTop: 16,
};
