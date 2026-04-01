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
    PressableVariant
} from "./PressableComponent";

export { default as ResponsiveText, TEXT_VARIANTS, mScale } from "./ResponsiveText";
export type { FontSize, ResponsiveTextProps } from "./ResponsiveText";

export { ScreenV2 } from "./ScreenV2";
export type { ExtendedEdge, ScreenV2Props } from "./ScreenV2";

export { default as ScrollViewComponent } from "./ScrollViewComponent";

export { default as SimpleKeyboardAvoidingView } from "./SimpleKeyboardAvoidingView";
export type { SimpleKeyboardAvoidingViewProps } from "./SimpleKeyboardAvoidingView";

export { TEXT_VARIANTS as TEXT_COMPONENT_VARIANTS, default as TextComponent } from "./TextComponent";
export type { TextComponentProps } from "./TextComponent";

export { default as TextInputComponent } from "./TextInputComponent";
export type { TextInputComponentProps } from "./TextInputComponent";

