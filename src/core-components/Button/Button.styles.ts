import { StyleSheet } from "react-native";
import { colors } from "@styles/colors";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  dimmed: {
    opacity: 0.5
  },
  text: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: "bold"
  },
});

export default styles;
