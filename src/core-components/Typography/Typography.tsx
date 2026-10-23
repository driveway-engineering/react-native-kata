import { Text, type TextProps } from "react-native";
import styles from "./Typography.styles";

export type TypographyVariant = "heading" | "title" | "subtitle" | "body" | "label" | "caption";

export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
};

/** Single source of truth for text styles across the app. */
const Typography = ({ variant = "body", style, accessibilityRole, ...props }: TypographyProps) => {
  return (
    <Text
      {...props}
      accessibilityRole={accessibilityRole ?? (variant === "heading" ? "header" : undefined)}
      style={[styles.base, styles[variant], style]}
    />
  );
}

export default Typography;
