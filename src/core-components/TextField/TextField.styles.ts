import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";
import { radius, spacing } from "@styles/spacing";

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
  },
});

export default styles;
