import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Base width for design (iPhone 12/13/14)
const BASE_WIDTH = 390;

/**
 * Scales a value based on the screen width
 * @param value - The value to scale
 * @returns The scaled value
 */
export const mScale = (value: number): number => {
  return (value * SCREEN_WIDTH) / BASE_WIDTH;
};
