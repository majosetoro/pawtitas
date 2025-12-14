import { StyleSheet } from "react-native";
import { colors, typography } from "../../../shared/styles";

export const getContainerStyle = (position) => ({
  position: "absolute",
  ...(position === "bottom" ? { bottom: 20 } : { top: 60 }),
  left: 20,
  right: 20,
  zIndex: 1000,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
});

export const styles = StyleSheet.create({
  container: {
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    ...typography.styles.body,
    flex: 1,
    fontWeight: "500",
  },
  closeButton: {
    marginLeft: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },

  // Estilos por tipo de mensaje
  successMessage: {
    backgroundColor: colors.success,
  },
  errorMessage: {
    backgroundColor: colors.error,
  },
  warningMessage: {
    backgroundColor: colors.warning,
  },
  infoMessage: {
    backgroundColor: colors.primaryDark,
  },
  successText: {
    color: colors.text.inverse,
  },
  errorText: {
    color: colors.text.inverse,
  },
  warningText: {
    color: colors.text.inverse,
  },
  infoText: {
    color: colors.text.inverse,
  },
});

