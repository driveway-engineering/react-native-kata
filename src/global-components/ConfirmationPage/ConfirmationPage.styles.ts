import { colors } from "@styles/colors";
import { spacing } from "@styles/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.successBackground,
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});
