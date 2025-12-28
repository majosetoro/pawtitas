import { StyleSheet } from "react-native";
import { colors, typography } from "../../shared/styles";

const styles = StyleSheet.create({
  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: colors.backgroundLanding,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 12,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: 30,
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 22,
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  },
  card: {
    width: 180,
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  icon: {
    fontSize: 40,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
    color: colors.text.primary,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: "center",
    opacity: 0.8,
  },
});

export default styles;

