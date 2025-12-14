import React from "react";
import { View, Text } from "react-native";
import { PerfilInputField } from "../../../../components";
import { styles } from "../editarPerfil.styles";

// Componente de formulario específico para el rol de administrador
export default function AdminPerfilForm({ formData, handleInputChange, errors }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Información Personal</Text>
      
      <PerfilInputField
        label="Nombre y Apellido"
        value={formData.nombreApellido}
        onChangeText={(value) => handleInputChange("nombreApellido", value)}
        placeholder="Ingresa tu nombre completo"
        error={errors.nombreApellido}
      />

      <PerfilInputField
        label="Descripción"
        value={formData.descripcion}
        onChangeText={(value) => handleInputChange("descripcion", value)}
        placeholder="Breve descripción de tu función"
        multiline={true}
        numberOfLines={4}
        maxLength={255}
        error={errors.descripcion}
      />

      <PerfilInputField
        label="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
        placeholder="tu@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
    </View>
  );
}
