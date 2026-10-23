import { colors } from "@styles/colors";
import { spacing } from "@styles/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    padding: 0,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 72,
    padding: spacing.md,
  },
  pressed: {
    opacity: 0.6,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  name: {
    color: colors.textMuted,
  },
  body: {
    borderTopColor: colors.text,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: spacing.sm,
    marginHorizontal: spacing.md,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  slots: {
    gap: spacing.sm,
  },
  bookButton: {
    marginTop: spacing.xs,
  },
});
