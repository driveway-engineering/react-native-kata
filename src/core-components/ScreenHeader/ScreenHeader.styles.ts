import { StyleSheet } from "react-native";
import { spacing } from "@styles/spacing";

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    height: 44,
    justifyContent: "center",
    marginLeft: -spacing.sm,
    width: 44,
  },
  backIcon: {
    transform: [{ rotate: "90deg" }],
  },
  subtitle: {
    textAlign: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});

export default styles;
