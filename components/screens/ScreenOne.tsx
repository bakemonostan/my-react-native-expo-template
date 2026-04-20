import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DrawerComponent from "../ui/DrawerComponent";

export default function ScreenOne() {
  const { colors } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DrawerComponent
      isOpen={drawerOpen}
      onToggle={setDrawerOpen}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Screen One</Text>
        <Text style={{ color: colors.textSecondary }}>
          This is the main content of Screen One
        </Text>

        <Button
          title="Toggle Drawer"
          onPress={() => setDrawerOpen(!drawerOpen)}
        />
      </View>
    </DrawerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
