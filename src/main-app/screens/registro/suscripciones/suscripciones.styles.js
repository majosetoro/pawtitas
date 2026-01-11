import { StyleSheet } from "react-native";
import { colors, typography } from "../../../../shared/styles";

export const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: colors.background, 
    padding: 24,
    paddingTop: 50,
  },
  topBackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  topBackButtonText: {
    fontSize: 16,
    fontFamily: typography.fontFamily.body,
    color: colors.text.primary,
    marginLeft: 8,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontFamily: typography.fontFamily.title,
    marginBottom: 8,
    color: colors.brand.highlight,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: typography.fontFamily.body,
    marginBottom: 24,
    color: colors.text.secondary,
    textAlign: "center",
  },
  
  minimalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  minimalIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  minimalHeaderText: {
    flex: 1,
  },
  minimalTitle: {
    fontSize: 20,
    fontFamily: typography.fontFamily.titleMedium,
    color: colors.text.primary,
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  minimalDescription: {
    fontSize: 13,
    fontFamily: typography.fontFamily.body,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  
  plansContainer: {
    flexDirection: "column",
    gap: 20,
    marginBottom: 20,
  },
  
  footerSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.body,
    color: colors.text.secondary,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.body,
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: colors.brand.highlight,
    borderRadius: 12,
  },
  backButtonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontFamily: typography.fontFamily.bodySemiBold,
    letterSpacing: 0.3,
  },
});