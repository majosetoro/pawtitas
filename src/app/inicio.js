import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function InicioScreen({ navigation }) {
  const [form, setForm] = useState({
   
    correo: "",
    password: "",
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput placeholder="Correo Electrónico" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Contraseña" style={styles.input} keyboardType="password" />
      
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancel]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.confirm]}>
          <Text style={styles.confirmText}>Ingresar</Text>
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
