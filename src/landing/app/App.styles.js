import { StyleSheet } from "react-native";
import { colors, typography } from "../../shared/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLanding,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    flexWrap: "wrap",
  },
  navContainer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  logo: {
    ...typography.styles.h1,
    color: colors.brand.logo,
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 0,
  },
  navMenu: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  navItem: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: "center",
  },
  heroTitle: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  highlight: {
    color: colors.brand.accentLanding,
  },
  heroSubtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: 16,
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 22,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 2,
  },
  playStore: {
    backgroundColor: colors.button.playStore,
  },
  appStore: {
    backgroundColor: colors.button.appStore,
    borderWidth: 0,
  },
  appStoreContainer: {
    position: "relative",
  },
  comingSoonBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: colors.button.secondary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    textAlign: "center",
    fontWeight: "600",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginTop: 5,
    marginBottom: 20,
  },
});

export default styles;

