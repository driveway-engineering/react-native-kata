import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";
import { radius, spacing } from "@styles/spacing";

const CIRCLE_SIZE = 20;

const styles = StyleSheet.create({
  option: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  circle: {
    alignItems: "center",
    borderColor: colors.primary,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    height: CIRCLE_SIZE,
    justifyContent: "center",
    width: CIRCLE_SIZE,
  },
  dot: {
    backgroundColor: colors.primary,
    borderRadius: CIRCLE_SIZE / 4,
    height: CIRCLE_SIZE / 2,
    width: CIRCLE_SIZE / 2,
  },
  label: {
    color: colors.primaryDark,
    flex: 1,
  },
});

export default styles;
