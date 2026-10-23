import Typography, { type TypographyProps } from "@core-components/Typography";
import { Linking } from "react-native";
import styles from "./TextLink.styles";

export type TextLinkProps = Omit<TypographyProps, "children" | "onPress"> & {
  children: string;
  /** Any URL the OS can open, e.g. `mailto:` or `tel:`. */
  href: string;
};

const TextLink = ({ children, href, style, ...props }: TextLinkProps) => {
  const openLink = () => {
    // Simulators often have no mail/phone app; failing quietly beats crashing.
    Linking.openURL(href).catch(() => undefined);
  };

  return (
    <Typography
      accessibilityRole="link"
      {...props}
      onPress={openLink}
      style={[styles.link, style]}
    >
      {children}
    </Typography>
  );
}

export default TextLink;
