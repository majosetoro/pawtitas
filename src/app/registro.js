import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function RegistroScreen({ navigation }) {
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    correo: "",
    telefono: "",
    ubicacion: "",
    documento: "",
    rol: "",
    especialidad: "",
    experiencia: "",
    certificados: "",
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      <TextInput placeholder="Nombre y Apellido" style={styles.input} />
      <TextInput placeholder="Edad" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Correo Electrónico" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Número Telefónico" style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Ubicación" style={styles.input} />
      <TextInput placeholder="Documento de Identidad" style={styles.input} />

      <Text style={styles.subtitle}>Defina su rol</Text>
      <Text>⬜ Dueño   ⬜ Prestador de Servicio</Text>

      <Text style={styles.subtitle}>Defina su especialidad</Text>
      <Text>⬜ Cuidador   ⬜ Paseador   ⬜ Clínica Veterinaria   ⬜ Veterinario a domicilio</Text>

      <TextInput placeholder="Experiencia" style={styles.input} />
      <TextInput placeholder="Certificados" style={styles.input} />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.confirm]}>
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  subtitle: { fontSize: 16, fontWeight: "600", marginTop: 10, marginBottom: 5 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: "center", marginHorizontal: 5 },
  cancel: { backgroundColor: "#eee" },
  confirm: { backgroundColor: "#6b4226" },
  cancelText: { color: "#333", fontWeight: "600" },
  confirmText: { color: "#fff", fontWeight: "600" },
});
