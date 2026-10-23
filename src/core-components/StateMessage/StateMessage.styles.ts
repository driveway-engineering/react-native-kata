import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";
import { spacing } from "@styles/spacing";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    gap: spacing.sm,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  text: {
    textAlign: "center",
  },
  errorTitle: {
    color: colors.error,
  },
  action: {
    alignSelf: "stretch",
    marginTop: spacing.md,
  },
});

export default styles;
