import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, typography } from "../shared/styles";

export default function Contacto() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Contacto</Text>
      <Text style={styles.subtitle}>
        Cualquier inquietud no dudes en consultarnos
      </Text>

      {/* Formulario */}
      <View style={styles.form}>
        <TextInput placeholder="Nombre completo" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
        <TextInput
          placeholder="Envíanos tus dudas/consultas y con gusto te responderemos a la brevedad"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      {/* Emojis / íconos de mascotas */}
      <View style={styles.emojiRow}>
        <Text style={styles.emoji}>🐶</Text>
        <Text style={styles.emoji}>🐩</Text>
        <Text style={styles.emoji}>🐱</Text>
        <Text style={styles.emoji}>🐈</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: colors.backgroundLanding,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 12,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
    fontSize: 16,
  },
  form: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
    padding: 12,
    marginBottom: 20,
    fontSize: 15,
    backgroundColor: "transparent",
    color: colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  button: {
    backgroundColor: colors.brand.lightBlue,
    borderWidth: 2,
    borderColor: colors.brand.lightBlue,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    fontWeight: "800",
    fontSize: 16,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  emoji: {
    fontSize: 40,
  },
});
