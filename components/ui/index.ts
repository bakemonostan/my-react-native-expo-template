// Project-agnostic UI components
// These components have no dependencies on project-specific constants or utilities

// Font configuration - customize this for your project
export { FONT_FAMILY_MAP, getFontFamily } from "./fontConfig";
export type { FontWeight } from "./fontConfig";

export { default as AlertComponent } from "./AlertComponent";
export type { AlertComponentProps, AlertVariant } from "./AlertComponent";

export { default as AvatarComponent } from "./AvatarComponent";
export type { AvatarComponentProps } from "./AvatarComponent";

export { default as BadgeComponent } from "./BadgeComponent";
export type { BadgeComponentProps } from "./BadgeComponent";

export { ExternalLink } from "./ExternalLink";

export { default as IconComponent } from "./IconComponent";
export type { IconComponentProps, IconLibrary } from "./IconComponent";

export { default as ImageComponent } from "./ImageComponent";
export type { ImageComponentProps } from "./ImageComponent";

export { default as LoadingComponent } from "./LoadingComponent";
export type { LoadingComponentProps } from "./LoadingComponent";

export { default as ModalComponent } from "./ModalComponent";
export type { ModalComponentProps } from "./ModalComponent";

export { default as PressableComponent } from "./PressableComponent";
export type {
  PressableComponentProps,
  PressableSize,
  PressableVariant,
} from "./PressableComponent";

export { Screen } from "./Screen";
export type { ExtendedEdge, ScreenProps } from "./Screen";

export { default as ScrollViewComponent } from "./ScrollViewComponent";

export { default as SimpleKeyboardAvoidingView } from "./SimpleKeyboardAvoidingView";
export type { SimpleKeyboardAvoidingViewProps } from "./SimpleKeyboardAvoidingView";

export {
  default as TextComponent,
  mScale,
  ResponsiveText,
  TEXT_VARIANTS,
  TEXT_VARIANTS as TEXT_COMPONENT_VARIANTS,
} from "./TextComponent";
export type {
  FontSize,
  ResponsiveTextProps,
  TextComponentProps,
} from "./TextComponent";

export { default as TextInputComponent } from "./TextInputComponent";
export type { TextInputComponentProps } from "./TextInputComponent";

export { default as TextAreaComponent } from "./TextAreaComponent";
export type { TextAreaComponentProps } from "./TextAreaComponent";

export { default as RadioButtonCard } from "./RadioButtonCard";
export type { RadioButtonCardProps } from "./RadioButtonCard";

export { default as StateHandler } from "./StateHandler";
export type { StateHandlerProps } from "./StateHandler";

export { default as ErrorState } from "./ErrorState";
export type { ErrorStateProps } from "./ErrorState";

export { default as GradientView } from "./GradientView";
export type { GradientViewProps } from "./GradientView";

export { default as SkeletonComponent } from "./SkeletonComponent";
export type { SkeletonComponentProps } from "./SkeletonComponent";
