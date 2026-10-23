import { StyleSheet } from "react-native";
import { spacing } from "@styles/spacing";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    gap: spacing.md,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  message: {
    textAlign: "center",
  },
});

export default styles;
