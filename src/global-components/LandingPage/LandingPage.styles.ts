import { colors } from "@styles/colors";
import { spacing } from "@styles/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    aspectRatio: 700 / 490,
    maxWidth: 360,
    width: "100%",
  },
  intro: {
    color: colors.text,
    textAlign: "center",
  },
  support: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: spacing.xs,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  supportLink: {
    paddingVertical: spacing.xs,
  },
});
