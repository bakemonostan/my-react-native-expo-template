import { Colors } from "../constants/Colors";
import {
  AnimationValues,
  BorderRadius,
  ScaleUtils,
  Shadows,
} from "./borders-shadows-animations";
import { ComponentSizes } from "./component-dimensions";
import { IconSizes } from "./icon-sizes";
import { Layout } from "./layout-dimensions";
import { PresetStyles } from "./presets";
import { Spacing } from "./spacing";
import { TouchTargets } from "./touch-targets";
import { Typography } from "./typography";

export const Theme = {
  Spacing,
  Typography,
  BorderRadius,
  TouchTargets,
  IconSizes,
  ComponentSizes,
  Layout,
  AnimationValues,
  Shadows,
  ScaleUtils,
  PresetStyles,
  Colors,
} as const;
