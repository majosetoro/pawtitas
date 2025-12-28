import { StyleSheet } from "react-native";
import { colors } from "../../shared/styles";

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.surface,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 60,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  container: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    gap: 6,
  },
  
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: 16,
  },
  
  // Marca minimalista
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandText: {
    flexDirection: "column",
    gap: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.brand.accentLanding,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "400",
    opacity: 0.85,
  },
  
  // Links de navegación
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  linkText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  separator: {
    fontSize: 14,
    color: colors.text.disabled,
  },
  
  // Redes sociales
  socials: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  
  // Copyright
  copyright: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.8,
  },
});

export default styles;

