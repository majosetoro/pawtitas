import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, typography } from "../../../shared/styles";

// Componente reutilizable para campos de entrada en formularios de perfil
export default function PerfilInputField({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  rightComponent,
  error,
  ...props 
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[
        styles.inputWrapper,
        error && styles.inputWrapperError
      ]}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.text.disabled}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? "top" : "center"}
          {...props}
        />
        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  inputLabel: {
    ...typography.styles.bodyMedium,
    color: colors.text.primary,
    marginBottom: 8,
    fontWeight: "500",
  },
  inputWrapper: {
    position: "relative",
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text.primary,
    backgroundColor: "transparent",
    minHeight: 50,
  },
  inputMultiline: {
    minHeight: 80,
    paddingTop: 14,
  },
  rightComponent: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.error,
    marginTop: 4,
  },
});
