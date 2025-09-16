import React from "react";
import { View, Text, Switch } from "react-native";
import { PerfilInputField } from "../../../../components";
import { styles } from "../editarPerfil.styles";
import { colors } from "../../../../../shared/styles";

// Componente de formulario específico para el rol de prestador de servicios

export default function PrestadorServicioPerfilForm({ formData, handleInputChange, errors }) {
  // Estado local para disponibilidad semanal
  const handleAvailabilityChange = (day, value) => {
    const updatedAvailability = { ...formData.availability, [day]: value };
    handleInputChange("availability", updatedAvailability);
  };

  // Estado local para servicios ofrecidos
  const handleServiceChange = (service, value) => {
    const updatedServices = { ...formData.services, [service]: value };
    handleInputChange("services", updatedServices);
  };

  // Estado local para servicio activo
  const handleServiceActiveChange = (value) => {
    handleInputChange("serviceActive", value);
  };

  return (
    <>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        
        <PerfilInputField
          label="Nombre y Apellido"
          value={formData.nombreApellido}
          onChangeText={(value) => handleInputChange("nombreApellido", value)}
          placeholder="Ingresa tu nombre completo"
          error={errors.nombreApellido}
          required={true}
        />

        <PerfilInputField
          label="Descripción"
          value={formData.descripcion}
          onChangeText={(value) => handleInputChange("descripcion", value)}
          placeholder="Describe tus servicios y experiencia"
          multiline={true}
          numberOfLines={4}
          maxLength={255}
          error={errors.descripcion}
          required={true}
        />

        <PerfilInputField
          label="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          placeholder="tu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          required={true}
        />

        <PerfilInputField
          label="Número de teléfono"
          value={formData.telefono}
          onChangeText={(value) => handleInputChange("telefono", value)}
          placeholder="11 1234 5678"
          keyboardType="phone-pad"
          error={errors.telefono}
          required={true}
        />

        <PerfilInputField
          label="Ubicación"
          value={formData.ubicacion}
          onChangeText={(value) => handleInputChange("ubicacion", value)}
          placeholder="Dirección o zona de servicio"
          error={errors.ubicacion}
          required={true}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        {errors.services && (
          <Text style={styles.errorText}>{errors.services}</Text>
        )}
        
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxItem}>
            <Switch 
              value={formData.services?.cuidador || false}
              onValueChange={(value) => handleServiceChange("cuidador", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.checkboxLabel}>Cuidador</Text>
          </View>
          
          <View style={styles.checkboxItem}>
            <Switch 
              value={formData.services?.paseador || false}
              onValueChange={(value) => handleServiceChange("paseador", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.checkboxLabel}>Paseador</Text>
          </View>
          
          <View style={styles.checkboxItem}>
            <Switch 
              value={formData.services?.veterinarioDomicilio || false}
              onValueChange={(value) => handleServiceChange("veterinarioDomicilio", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.checkboxLabel}>Veterinario a domicilio</Text>
          </View>
          
          <View style={styles.checkboxItem}>
            <Switch 
              value={formData.services?.clinicaVeterinaria || false}
              onValueChange={(value) => handleServiceChange("clinicaVeterinaria", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.checkboxLabel}>Clínica Veterinaria</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Precio y duración</Text>
        
        <PerfilInputField
          label="Precio"
          value={formData.precio}
          onChangeText={(value) => handleInputChange("precio", value)}
          placeholder="$"
          keyboardType="numeric"
          error={errors.precio}
          required={true}
        />

        <PerfilInputField
          label="Duración"
          value={formData.duracion}
          onChangeText={(value) => handleInputChange("duracion", value)}
          placeholder="hh:mm"
          error={errors.duracion}
          required={true}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disponibilidad</Text>
        {errors.availability && (
          <Text style={styles.errorText}>{errors.availability}</Text>
        )}
        
        <View style={styles.availabilityGroup}>
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.lunes || false}
              onValueChange={(value) => handleAvailabilityChange("lunes", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Lunes</Text>
          </View>
          
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.martes || false}
              onValueChange={(value) => handleAvailabilityChange("martes", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Martes</Text>
          </View>
          
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.miercoles || false}
              onValueChange={(value) => handleAvailabilityChange("miercoles", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Miércoles</Text>
          </View>
          
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.jueves || false}
              onValueChange={(value) => handleAvailabilityChange("jueves", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Jueves</Text>
          </View>
          
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.viernes || false}
              onValueChange={(value) => handleAvailabilityChange("viernes", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Viernes</Text>
          </View>
          
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.sabado || false}
              onValueChange={(value) => handleAvailabilityChange("sabado", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Sábado</Text>
          </View>
          
          <View style={styles.dayItem}>
            <Switch 
              value={formData.availability?.domingo || false}
              onValueChange={(value) => handleAvailabilityChange("domingo", value)}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
            <Text style={styles.dayLabel}>Domingo</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado del servicio</Text>
        
        <View style={styles.serviceStatusContainer}>
          <View style={styles.serviceStatusSwitch}>
            <Text style={styles.serviceStatusLabel}>Servicio activo</Text>
            <Switch 
              value={formData.serviceActive || false}
              onValueChange={handleServiceActiveChange}
              trackColor={{ false: colors.border.medium, true: "#B77B5D" }}
              thumbColor={colors.surface}
            />
          </View>
          <Text style={styles.serviceStatusInfo}>
            Los clientes podrán encontrarte y contactarte 
          </Text>
        </View>
      </View>
    </>
  );
}
