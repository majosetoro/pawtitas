import { StyleSheet } from "react-native";
import { colors, typography } from "../../../../shared/styles";

export const styles = StyleSheet.create({
  planCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    minHeight: 380,
    borderWidth: 1,
    borderColor: colors.border.light,
    position: "relative",
  },
  planCardPremium: {
    borderWidth: 1.5,
    borderColor: colors.border.medium,
  },
  planHeader: {
    marginBottom: 16,
  },
  planTitle: {
    fontSize: 22,
    fontFamily: typography.fontFamily.titleMedium,
    color: colors.text.primary,
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  recomendadoTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "transparent",
    borderRadius: 6,
  },
  recomendadoText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bodySemiBold,
    letterSpacing: 0.3,
  },
  priceSection: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  priceCurrency: {
    fontSize: 20,
    fontFamily: typography.fontFamily.title,
    color: colors.text.secondary,
    marginTop: 4,
    marginRight: 2,
  },
  planPrice: {
    fontSize: 40,
    fontFamily: typography.fontFamily.title,
    fontWeight: "700",
    letterSpacing: -1.5,
    lineHeight: 44,
  },
  pricePeriod: {
    fontSize: 14,
    fontFamily: typography.fontFamily.body,
    color: colors.text.secondary,
    letterSpacing: 0.2,
  },
  featuresContainer: {
    flex: 1,
    marginBottom: 20,
  },
  consultarButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto",
  },
  consultarButtonText: {
    fontSize: 14,
    fontFamily: typography.fontFamily.bodySemiBold,
    letterSpacing: 0.3,
  },
});

