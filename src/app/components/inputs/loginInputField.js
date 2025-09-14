import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, typography } from "../../../shared/styles";

// Este input se usa para los campos de texto del formulario de inicio de sesión
export default function LoginInputField({ label, value, onChangeText, placeholder, secureTextEntry, rightComponent, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          {...props}
        />
        {rightComponent && <View style={styles.rightComponent}>{rightComponent}</View>}
      </View>
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
    marginBottom: 10,
    fontWeight: "500",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1.2,
    borderColor: "#D1D1D1",
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 15,
    lineHeight: 20,
    color: colors.text.primary,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "center",
  },
  rightComponent: {
    position: "absolute",
    right: 14,
    top: "30%",
  },
});
