import { StyleSheet } from "react-native";
import { colors, typography } from "../../../../shared/styles";

export const styles = StyleSheet.create({
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  featureRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  featureCheck: {
    marginRight: 10,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    fontFamily: typography.fontFamily.body,
    color: colors.text.primary,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
});

