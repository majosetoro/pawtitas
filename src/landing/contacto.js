import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, typography } from "../shared/styles";

export default function Contacto() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Contacto</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur adipiscing elit.{"\n"}
        Consectetur adipiscing elit quisque faucibus ex sapien vitae.
      </Text>

      {/* Formulario */}
      <View style={styles.form}>
        <TextInput placeholder="Nombre y Apellido" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
        <TextInput
          placeholder="Envíanos tus dudas/consultas y con gusto te responderemos"
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
    padding: 20,
    alignItems: "center",
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
  emojiRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  emoji: {
    fontSize: 28,
    marginHorizontal: 5,
  },
});
