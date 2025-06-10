import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export default function BottomSheetScreenContainer({ children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {Platform.OS === "android" && (
        <View style={styles.grabberContainer}>
          <View style={styles.grabber} />
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grabberContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 10,
  },
  grabber: {
    width: 36,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
  },
});
