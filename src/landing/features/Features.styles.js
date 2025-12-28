import { StyleSheet } from "react-native";
import { colors } from "../../shared/styles";

const styles = StyleSheet.create({
  section: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundLanding,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 32,
    maxWidth: 1000,
    alignSelf: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 200,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    opacity: 0.8,
  },
});

export default styles;

