import { mScale } from "@/constants/mixins";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import IconComponent from "./IconComponent";

const GoBack = ({
  onPress = () => {
    router.back();
  },
}: {
  onPress?: () => void;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <IconComponent library="Feather" name="chevron-left" size={20} />
    </Pressable>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: mScale(100),
    height: mScale(32),
    alignItems: "center",
    justifyContent: "center",
  },
});
