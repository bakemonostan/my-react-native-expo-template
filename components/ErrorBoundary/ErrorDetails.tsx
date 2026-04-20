import { ErrorInfo, useMemo } from "react";
import { ScrollView, TextStyle, View, ViewStyle } from "react-native";

import IconComponent from "@/components/ui/IconComponent";
import PressableComponent from "@/components/ui/PressableComponent";
import { Screen } from "@/components/ui/Screen";
import TextComponent from "@/components/ui/TextComponent";
import { useTheme } from "@/hooks/useTheme";

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
  const { colors } = useTheme();

  const { $contentContainer, $errorSection } = useMemo(() => {
    const content: ViewStyle = {
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 24,
      flex: 1,
    };

    const errorSection: ViewStyle = {
      flex: 2,
      backgroundColor: colors.backgroundSecondary,
      marginVertical: 16,
      borderRadius: 8,
      width: "100%",
    };

    return { $contentContainer: content, $errorSection: errorSection };
  }, [colors.backgroundSecondary]);

  return (
    <Screen
      scrollable={false}
      safeAreaEdges={["top", "bottom"]}
      backgroundColor={colors.background}
      bodyStyle={$contentContainer}>
      <View style={$topSection}>
        <IconComponent
          library="MaterialCommunityIcons"
          name="bug"
          size={64}
          color={colors.error}
        />
        <TextComponent
          weight="semi_bold"
          size="xxl"
          color={colors.error}
          styles={$heading}>
          Oops! Something went wrong
        </TextComponent>
        <TextComponent
          weight="regular"
          size="base"
          color={colors.textSecondary}>
          We&apos;re sorry for the inconvenience. The error has been logged.
        </TextComponent>
      </View>

      <ScrollView
        style={$errorSection}
        contentContainerStyle={$errorSectionContentContainer}>
        <TextComponent
          weight="bold"
          size="sm"
          color={colors.error}
          styles={$errorContent}>
          {`${props.error}`.trim()}
        </TextComponent>
        <TextComponent
          weight="regular"
          size="xs"
          color={colors.textDim}
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
        pressableStyle={$resetButton}
        onPress={props.onReset}
      />
    </Screen>
  );
}

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
