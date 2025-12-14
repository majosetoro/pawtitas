import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { colors, typography } from "../../../shared/styles";

// Componente reutilizable para botón de guardar y cancelar
export default function GuardarCancelarBtn({ 
  label = "Guardar", 
  onPress, 
  loading = false,
  disabled = false,
  variant = "primary",
  showCancel = false,
  cancelLabel = "Cancelar",
  onCancel,
  ...props 
}) {
  const buttonStyle = [
    styles.button,
    styles[variant],
    disabled && styles.disabled
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    disabled && styles.disabledText
  ];

  if (showCancel && onCancel) {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[buttonStyle, styles.cancelButton]} 
          onPress={onCancel} 
          activeOpacity={0.7}
          disabled={loading}
        >
          <Text style={[textStyle, styles.cancelText]}>{cancelLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={buttonStyle} 
          onPress={onPress} 
          activeOpacity={0.7}
          disabled={disabled || loading}
          {...props}
        >
          {loading ? (
            <ActivityIndicator 
              color={variant === "primary" ? colors.text.inverse : colors.primaryDark} 
              size="small" 
            />
          ) : (
            <Text style={textStyle}>{label}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === "primary" ? colors.text.inverse : colors.primaryDark} 
          size="small" 
        />
      ) : (
        <Text style={textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    alignSelf: "center",
    minWidth: 160,
    maxWidth: 200,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  primary: {
    backgroundColor: colors.primaryDark,
    borderWidth: 0,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  disabled: {
    backgroundColor: colors.border.light,
    borderColor: colors.border.light,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    ...typography.styles.button,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  disabledText: {
    color: colors.text.disabled,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.medium,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 1,
  },
  cancelText: {
    color: colors.text.secondary,
  },
});
