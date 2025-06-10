import { Dimensions, PixelRatio } from "react-native";

export const { width, height } = Dimensions.get("window");

export const widthToDp = (number: number | string): number => {
  const actualWidth = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * actualWidth) / 100);
};

export const heightToDp = (number: number | string): number => {
  const actualHeight = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((height * actualHeight) / 100);
};

export const ITEM_WIDTH: number = width * 0.71;
export const ITEM_HEIGHT: number = height * 0.2;
export const SPACING: number = 16;
export const ICON_SIZE: number = 65;
export const FULL_SIZE: number = width + SPACING * 0.1;

export const BANNER_H: number = heightToDp("90%");
export const TOPNAVI_H: number = heightToDp(20);
