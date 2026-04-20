import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message';
import TextComponent from './TextComponent';

/**
 * Renders the toast config using theme-aware colors.
 * Call `setupToastConfig()` and pass the result to Toast's `config` prop,
 * or just use `<ToastComponent />` which does it all for you.
 */
function useToastConfig(): ToastConfig {
  const { colors } = useTheme();

  return {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[
          styles.base,
          {
            borderLeftColor: colors.success,
            shadowColor: colors.palette.black,
          },
        ]}
        contentContainerStyle={{ backgroundColor: colors.surface }}
        text1Style={{ color: colors.text, fontWeight: '600', fontSize: 14 }}
        text2Style={{ color: colors.textSecondary, fontSize: 12 }}
      />
    ),
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        style={[
          styles.base,
          {
            borderLeftColor: colors.error,
            shadowColor: colors.palette.black,
          },
        ]}
        contentContainerStyle={{ backgroundColor: colors.surface }}
        text1Style={{ color: colors.text, fontWeight: '600', fontSize: 14 }}
        text2Style={{ color: colors.textSecondary, fontSize: 12 }}
      />
    ),
    info: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={[
          styles.base,
          {
            borderLeftColor: colors.primary,
            shadowColor: colors.palette.black,
          },
        ]}
        contentContainerStyle={{ backgroundColor: colors.surface }}
        text1Style={{ color: colors.text, fontWeight: '600', fontSize: 14 }}
        text2Style={{ color: colors.textSecondary, fontSize: 12 }}
      />
    ),
    warning: (props: BaseToastProps) => (
      <View
        style={[
          styles.base,
          styles.warningContainer,
          {
            backgroundColor: colors.warningBackground,
            borderLeftColor: colors.warning,
            shadowColor: colors.palette.black,
          },
        ]}>
        <View style={styles.warningContent}>
          <TextComponent
            weight='semi_bold'
            size='sm'
            color={colors.text}>
            {props.text1 ?? ''}
          </TextComponent>
          {props.text2 ? (
            <TextComponent
              size='xs'
              color={colors.textSecondary}
              style={styles.warningSubtext}>
              {props.text2}
            </TextComponent>
          ) : null}
        </View>
      </View>
    ),
  };
}

/**
 * Drop-in Toast renderer. Place once at the bottom of your root layout,
 * outside all other providers but inside `ThemeProvider`.
 *
 * @example Root layout usage
 * ```tsx
 * // app/_layout.tsx
 * import { ToastComponent } from "@/components/ui";
 *
 * export default function RootLayout() {
 *   return (
 *     <ThemeProvider>
 *       ...
 *       <Stack />
 *       <ToastComponent />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * @example Showing a toast anywhere in the app
 * ```tsx
 * import { useToast } from "@/hooks/useToast";
 *
 * const { success, error, info, warning } = useToast();
 *
 * success("Saved!", "Your changes have been saved.");
 * error("Something went wrong", "Please try again.");
 * info("Heads up", "A new version is available.");
 * warning("Watch out", "You are approaching your limit.");
 * ```
 */
export default function ToastComponent() {
  const config = useToastConfig();
  return <Toast config={config} />;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderRadius: 8,
    width: '85%',
  },
  warningContent: {
    flex: 1,
  },
  warningSubtext: {
    marginTop: 2,
  },
});
