import { AuthPersistBridge } from "@/components/AuthPersistBridge";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ToastComponent from "@/components/ui/ToastComponent";
import { featureFlags } from "@/config/featureFlags";
import { I18nProvider } from "@/context/I18nContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { usePushNotificationsSetup } from "@/hooks/usePushNotificationsSetup";
import { customFontsToLoad } from "@/theme/typography";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Network from "expo-network";
import { SplashScreen, Stack } from "expo-router";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      networkMode: "offlineFirst",
      retryOnMount: true,
    },
    mutations: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      networkMode: "offlineFirst",
    },
  },
});

// Set up network state listener
onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });
  return eventSubscription.remove;
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

/**
 * Syncs React Navigation (tabs, stack, headers) with app light/dark colors.
 * Without this, navigators keep the default light gray/white chrome.
 */
function PushSetup() {
  usePushNotificationsSetup();
  return null;
}

function ThemedNavigationShell({ children }: { children: ReactNode }) {
  const { colors, isDark } = useTheme();
  const navigationTheme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      dark: isDark,
      colors: {
        ...(isDark ? DarkTheme : DefaultTheme).colors,
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.border,
        notification: colors.error,
      },
    }),
    [colors, isDark],
  );

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);
  const splashHidden = useRef(false);

  const hideSplashScreen = async () => {
    if (!splashHidden.current) {
      splashHidden.current = true;
      await SplashScreen.hideAsync();
    }
  };

  // Hide splash screen when fonts are ready or on error
  useEffect(() => {
    if (fontsLoaded || fontError) {
      hideSplashScreen();
    }
  }, [fontsLoaded, fontError]);

  // Safety timeout - hide splash after 3 seconds regardless
  useEffect(() => {
    const timeout = setTimeout(() => {
      hideSplashScreen();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Set up app state listener for React Query focus management
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  // Don't render anything until fonts are loaded or timeout
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ErrorBoundary catchErrors="always">
    <ThemeProvider>
    <I18nProvider>
    <QueryClientProvider client={queryClient}>
      <ThemedNavigationShell>
        <BottomSheetModalProvider>
          <PushSetup />
          <AuthPersistBridge />
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(app)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Modal"
              options={{
                title: "Modal",
                ...Platform.select({
                  ios: {
                    presentation: "formSheet" as const,
                    sheetCornerRadius: 20,
                    sheetElevation: 34,
                    sheetExpandsWhenScrolledToEdge: true,
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.5] as [number],
                    gestureEnabled: false,
                  },
                  default: {
                    presentation: "modal" as const,
                  },
                }),
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </ThemedNavigationShell>
      {featureFlags.enableToast ? <ToastComponent /> : null}
    </QueryClientProvider>
    </I18nProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}
