import { StyleSheet } from "react-native";
import { colors, typography } from "../../shared/styles";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: colors.border.light,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  dateInput: {
    justifyContent: 'center',
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1.5,
  },
  selectedText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.body,
    color: colors.text.primary,
  },
  placeholderText: {
    fontSize: 15,
    fontFamily: typography.fontFamily.body,
    color: '#999',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    fontFamily: typography.fontFamily.body,
    marginBottom: 8,
    marginTop: -8,
  },
});

