import { StyleSheet } from "react-native";
import { colors, typography } from "../../../shared/styles";

export const styles = StyleSheet.create({
    container: { 
      flexGrow: 1, 
      backgroundColor: colors.background, 
      padding: 24,
      paddingTop: 50,
    },
    title: { 
      fontSize: 28, 
      fontWeight: "bold", 
      marginBottom: 24, 
      marginTop: 30,
      color: colors.brand.highlight,
      textAlign: "center",
    },
    input: {
      borderWidth: 1.5,
      borderColor: colors.border.light,
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      backgroundColor: colors.surface,
      fontSize: 15,
      color: colors.text.primary,
    },
    inputError: {
      borderColor: colors.error,
      borderWidth: 1.5,
    },
    errorText: {
      color: colors.error,
      fontSize: 12,
      marginBottom: 8,
      marginTop: -8,
    },
    subtitle: { 
      fontSize: 16, 
      fontWeight: "600", 
      marginTop: 16, 
      marginBottom: 8,
      color: colors.text.primary,
    },
    picker: {
      borderWidth: 1.5,
      borderColor: colors.border.light,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: colors.surface,
    },
    clipButton: {
      borderWidth: 1.5,
      borderColor: colors.border.light,
      borderRadius: 12,
      padding: 14,
      marginBottom: 12,
      backgroundColor: colors.surfaceVariant,
    },
    clipButtonError: {
      borderColor: colors.error,
      borderWidth: 1.5,
    },
    clipText: {
      color: colors.text.primary,
      fontSize: 15,
    },
    reminderText: {
      color: colors.text.secondary,
      fontSize: 12,
      fontStyle: "italic",
      marginBottom: 8,
      marginTop: -4,
      lineHeight: 16,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    cancel: { 
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.brand.highlight,
    },
    confirm: { 
      backgroundColor: colors.brand.highlight,
    },
    cancelText: { 
      color: colors.brand.highlight, 
      fontWeight: "700",
      fontSize: 15,
    },
    confirmText: { 
      color: colors.text.inverse, 
      fontWeight: "700",
      fontSize: 15,
    },
    infoText: {
      color: colors.text.secondary,
      fontSize: 12,
      textAlign: "center",
      marginTop: 24,
      marginBottom: 20,
      fontStyle: "italic",
      lineHeight: 18,
    },
  });
  