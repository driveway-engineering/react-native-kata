import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";
import { radius, spacing } from "@styles/spacing";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.errorBackground,
    borderColor: colors.error,
    borderLeftWidth: 4,
    borderRadius: radius.sm,
    gap: spacing.sm,
    padding: spacing.md,
  },
  title: {
    color: colors.error,
  },
  action: {
    alignSelf: "flex-start",
  },
});

export default styles;
