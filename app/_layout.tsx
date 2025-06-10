import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="Modal"
            options={{
              presentation: "formSheet",
              title: "Modal",
              sheetCornerRadius: 20,
              sheetElevation: 34,
              sheetExpandsWhenScrolledToEdge: true,
              sheetGrabberVisible: true,
              sheetAllowedDetents: [0.5],
              gestureEnabled: false,
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
