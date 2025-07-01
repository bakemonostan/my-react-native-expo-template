import { mScale } from "@/constants/mixins";

export const customFontsToLoad = {
  "AfacadFlux-Regular": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-Regular.ttf"),
  "AfacadFlux-Medium": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-Medium.ttf"),
  "AfacadFlux-SemiBold": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-SemiBold.ttf"),
  "AfacadFlux-Bold": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-Bold.ttf"),
  "AfacadFlux-ExtraBold": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-ExtraBold.ttf"),
  "AfacadFlux-Light": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-Light.ttf"),
  "AfacadFlux-ExtraLight": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-ExtraLight.ttf"),
  "AfacadFlux-Thin": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-Thin.ttf"),
  "AfacadFlux-Black": require("../assets/fonts/Afacad_Flux/static/AfacadFlux-Black.ttf"),
};

export const typography = {
  fontFamily: {
    regular: "AfacadFlux-Regular",
    medium: "AfacadFlux-Medium",
    semiBold: "AfacadFlux-SemiBold",
    bold: "AfacadFlux-Bold",
    extraBold: "AfacadFlux-ExtraBold",
    light: "AfacadFlux-Light",
    extraLight: "AfacadFlux-ExtraLight",
    thin: "AfacadFlux-Thin",
    black: "AfacadFlux-Black",
  },

  fontSize: {
    // Small text
    xs: mScale(10), // Captions, fine print
    sm: mScale(12), // Small labels
    base: mScale(14), // Body text, default
    md: mScale(16), // Larger body text
    lg: mScale(18), // Subheadings

    // Headings
    xl: mScale(20), // H3
    xxl: mScale(24), // H2
    xxxl: mScale(28), // H1
    huge: mScale(32),
    mega: mScale(40),
    giant: mScale(48),
  },

  lineHeight: {
    lh110: mScale(15.4), // 14 * 1.1
    tight: mScale(16.8), // 14 * 1.2
    lh125: mScale(17.5), // 14 * 1.25
    lh130: mScale(18.2), // 14 * 1.3
    lh135: mScale(18.9), // 14 * 1.35
    normal: mScale(19.6), // 14 * 1.4
    relaxed: mScale(22.4), // 14 * 1.6
    loose: mScale(25.2), // 14 * 1.8
  },

  letterSpacing: {
    tight: mScale(-0.5),
    normal: 0,
    wide: mScale(0.5),
    wider: mScale(1),
    widest: mScale(2),
  },
} as const;
