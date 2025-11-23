import React, { useState, useRef } from "react";
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
import { FloatingMessage } from "../../components";
import { styles } from "./registro.styles";

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
    documentosFile: null,
    certificadosFile: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isScrollAtBottom, setIsScrollAtBottom] = useState(false);
  const scrollViewRef = useRef(null);

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

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!form.edad.trim()) {
      newErrors.edad = "La edad es obligatoria";
    } else if (isNaN(form.edad) || parseInt(form.edad) <= 0) {
      newErrors.edad = "La edad debe ser un número válido mayor a 0";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!emailRegex.test(form.correo)) {
      newErrors.correo = "El correo no es válido";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!form.telefono.trim()) {
      newErrors.telefono = "El número telefónico es obligatorio";
    }

    if (!form.ubicacion.trim()) {
      newErrors.ubicacion = "La ubicación es obligatoria";
    }

    if (!form.documento.trim()) {
      newErrors.documento = "El documento de identidad es obligatorio";
    }

    // Validar perfil
    if (!perfil) {
      newErrors.perfil = "Debe seleccionar un rol";
    }

    if (perfil === "prestador" && !especialidad) {
      newErrors.especialidad = "Debe seleccionar una especialidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Agregar para enviar datos a la bd
      if (perfil === "prestador") {
        setSuccessMessage("¡Listo! Tu registro fue exitoso. Revisaremos tus datos y te notificaremos por correo cuando tu cuenta esté habilitada.");
      } else if (perfil === "dueno") {
        setSuccessMessage("¡Bienvenido/a! Tu registro fue exitoso, ya podés usar la app.");
      }
    }
  };

  const handleHideMessage = () => {
    setSuccessMessage("");
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setIsScrollAtBottom(isAtBottom);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
      <Text style={styles.title}>Registrarse</Text>

      {/* Campos básicos */}
      <TextInput
        placeholder="Nombre y Apellido"
        style={[styles.input, errors.nombre && styles.inputError]}
        value={form.nombre}
        onChangeText={(v) => setForm({ ...form, nombre: v })}
      />
      {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

      <TextInput
        placeholder="Edad"
        style={[styles.input, errors.edad && styles.inputError]}
        keyboardType="numeric"
        value={form.edad}
        onChangeText={(v) => setForm({ ...form, edad: v })}
      />
      {errors.edad && <Text style={styles.errorText}>{errors.edad}</Text>}

      <TextInput
        placeholder="Correo Electrónico"
        style={[styles.input, errors.correo && styles.inputError]}
        keyboardType="email-address"
        textContentType="emailAddress"
        value={form.correo}
        onChangeText={(v) => setForm({ ...form, correo: v })}
      />
      {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}

      <TextInput
        placeholder="Contraseña"
        style={[styles.input, errors.password && styles.inputError]}
        secureTextEntry={true}
        value={form.password}
        onChangeText={(v) => setForm({ ...form, password: v })}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TextInput
        placeholder="Número Telefónico"
        style={[styles.input, errors.telefono && styles.inputError]}
        keyboardType="phone-pad"
        value={form.telefono}
        onChangeText={(v) => setForm({ ...form, telefono: v })}
      />
      {errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}

      <TextInput
        placeholder="Ubicación"
        style={[styles.input, errors.ubicacion && styles.inputError]}
        value={form.ubicacion}
        onChangeText={(v) => setForm({ ...form, ubicacion: v })}
      />
      {errors.ubicacion && <Text style={styles.errorText}>{errors.ubicacion}</Text>}

      <TextInput
        placeholder="Documento de Identidad"
        style={[styles.input, errors.documento && styles.inputError]}
        keyboardType="numeric"
        value={form.documento}
        onChangeText={(v) => setForm({ ...form, documento: v })}
      />
      {errors.documento && <Text style={styles.errorText}>{errors.documento}</Text>}

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
      {errors.perfil && <Text style={styles.errorText}>{errors.perfil}</Text>}

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
          {errors.especialidad && <Text style={styles.errorText}>{errors.especialidad}</Text>}

          {/* Documentación - Adjuntar archivo */}
          <Text style={styles.reminderText}>Adjuntar documento de identidad y antecedentes penales no menor a 3 meses.</Text>
          <TouchableOpacity
            style={[styles.clipButton, errors.documentosFile && styles.clipButtonError]}
            onPress={() => pickFile("documentosFile")}
          >
            <Text style={styles.clipText}>
              {form.documentosFile ? `📎 ${form.documentosFile.name}` : "Adjuntar documentos"}
            </Text>
          </TouchableOpacity>
          {errors.documentosFile && <Text style={styles.errorText}>{errors.documentosFile}</Text>}

          {/* Certificados - Adjuntar archivo */}
          <Text style={styles.reminderText}>Adjuntar certificados de logros obtenidos y/o constancia de estudios.</Text>
          <TouchableOpacity
            style={[styles.clipButton, errors.certificadosFile && styles.clipButtonError]}
            onPress={() => pickFile("certificadosFile")}
          >
            <Text style={styles.clipText}>
              {form.certificadosFile ? `📎 ${form.certificadosFile.name}` : "Adjuntar certificados"}
            </Text>
          </TouchableOpacity>
          {errors.certificadosFile && <Text style={styles.errorText}>{errors.certificadosFile}</Text>}
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

        <TouchableOpacity 
          style={[styles.button, styles.confirm]}
          onPress={handleSubmit}
        >
          <Text style={styles.confirmText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>Más adelante podrás editar tu perfil y agregar más información.</Text>
      </ScrollView>

      <FloatingMessage
        visible={!!successMessage}
        message={successMessage}
        type="success"
        onHide={handleHideMessage}
        duration={5000}
        position="top"
      />
    </View>
  );
}