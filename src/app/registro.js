import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from 'expo-document-picker';

export default function RegistroScreen({ navigation }) {
  const [perfil, setPerfil] = useState(""); // dueño o prestador
  const [especialidad, setEspecialidad] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    edad: "",
    correo: "",
    password: "",
    telefono: "",
    ubicacion: "",
    documento: "",
    experienciaFile: null,
    certificadosFile: null,
  });

  // Función para seleccionar documento
  const pickFile = async (field) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        setForm({ ...form, [field]: result });
      }
    } catch (error) {
      console.log("Error al seleccionar archivo:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {/* Campos básicos */}
      <TextInput
        placeholder="Nombre y Apellido"
        style={styles.input}
        value={form.nombre}
        onChangeText={(v) => setForm({ ...form, nombre: v })}
      />
      <TextInput
        placeholder="Edad"
        style={styles.input}
        keyboardType="numeric"
        value={form.edad}
        onChangeText={(v) => setForm({ ...form, edad: v })}
      />
      <TextInput
        placeholder="Correo Electrónico"
        style={styles.input}
        keyboardType="email-address"
        textContentType="emailAddress"
        value={form.correo}
        onChangeText={(v) => setForm({ ...form, correo: v })}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={true}
        value={form.password}
        onChangeText={(v) => setForm({ ...form, password: v })}
      />
      <TextInput
        placeholder="Número Telefónico"
        style={styles.input}
        keyboardType="phone-pad"
        value={form.telefono}
        onChangeText={(v) => setForm({ ...form, telefono: v })}
      />
      <TextInput
        placeholder="Ubicación"
        style={styles.input}
        value={form.ubicacion}
        onChangeText={(v) => setForm({ ...form, ubicacion: v })}
      />
      <TextInput
        placeholder="Documento de Identidad"
        style={styles.input}
        keyboardType="numeric"
        value={form.documento}
        onChangeText={(v) => setForm({ ...form, documento: v })}
      />

      {/* Perfil */}
      <Text style={styles.subtitle}>Defina su rol</Text>
      <Picker
        selectedValue={perfil}
        style={styles.picker}
        onValueChange={(itemValue) => setPerfil(itemValue)}
      >
        <Picker.Item label="Seleccione un rol..." value="" />
        <Picker.Item label="Dueño" value="dueno" />
        <Picker.Item label="Prestador de Servicio" value="prestador" />
      </Picker>

      {/* Mostrar solo si es prestador */}
      {perfil === "prestador" && (
        <>
          <Text style={styles.subtitle}>Defina su especialidad</Text>
          <Picker
            selectedValue={especialidad}
            style={styles.picker}
            onValueChange={(itemValue) => setEspecialidad(itemValue)}
          >
            <Picker.Item label="Seleccione una especialidad..." value="" />
            <Picker.Item label="Cuidador" value="Cuidador" />
            <Picker.Item label="Paseador" value="Paseador" />
            <Picker.Item label="Veterinaria" value="Veterinaria" />
            <Picker.Item
              label="Veterinaria a domicilio"
              value="VeterinariaDomicilio"
            />
          </Picker>

          {/* Experiencia - Adjuntar archivo */}
          <TouchableOpacity
            style={styles.clipButton}
            onPress={() => pickFile("experienciaFile")}
          >
            <Text style={styles.clipText}>
              {form.experienciaFile ? `🔗 ${form.experienciaFile.name}` : "Adjuntar experiencia"}
            </Text>
          </TouchableOpacity>

          {/* Certificados - Adjuntar archivo */}
          <TouchableOpacity
            style={styles.clipButton}
            onPress={() => pickFile("certificadosFile")}
          >
            <Text style={styles.clipText}>
              {form.certificadosFile ? `🔗 ${form.certificadosFile.name}` : "Adjuntar certificados"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Botones */}
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, marginTop: 50 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  subtitle: { fontSize: 16, fontWeight: "600", marginTop: 10, marginBottom: 5 },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 12,
  },
  clipButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  clipText: {
    color: "#333",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancel: { backgroundColor: "#eee" },
  confirm: { backgroundColor: "#6b4226" },
  cancelText: { color: "#333", fontWeight: "600" },
  confirmText: { color: "#fff", fontWeight: "600" },
});
