import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";
import { spacing } from "@styles/spacing";

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
});

export default styles;
