import { Pressable, StyleSheet, Text, View, Button } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import DrawerComponent from "../ui/DrawerComponent";

export default function ScreenOne() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <DrawerComponent isOpen={drawerOpen} onToggle={setDrawerOpen}>
      <View style={styles.container}>
        <Text style={styles.title}>Screen One</Text>
        <Text>This is the main content of Screen One</Text>

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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
