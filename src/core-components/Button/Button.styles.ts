import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  secondary: {
    backgroundColor: colors.background,
  },
  dimmed: {
    opacity: 0.5
  },
  text: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: "bold"
  },
  secondaryText: {
    color: colors.primaryDark,
  },
});

export default styles;
