import { colors } from "@styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: colors.background,
  },
  heading: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
});
