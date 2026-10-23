import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  heading: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 34,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 26,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  caption: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;
