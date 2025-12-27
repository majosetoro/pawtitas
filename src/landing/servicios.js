import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography } from "../shared/styles";

const services = [
  { 
    title: "Cuidadores", 
    icon: "🏠",
    description: "Cuida tu mascota cuando no estás" 
  },
  { 
    title: "Paseadores", 
    icon: "🦮",
    description: "Paseos diarios para tu mejor amigo" 
  },
  { 
    title: "Emergencias", 
    icon: "🚑",
    description: "Atención veterinaria" 
  },
  { 
    title: "Veterinarios", 
    icon: "🐾",
    description: "Consultas y chequeos regulares" 
  },
];

export default function Servicios() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Servicios disponibles</Text>
      <Text style={styles.subtitle}>
        Contamos con todas las opciones para el cuidado de tu mascota
        {"\n\n"}
        ¿Te vas de viaje y necesitas cuidador? ¿Buscás paseador? ¿Necesitás veterinaria cercana o a domicilio? ¿Tenés una emergencia?
        {"\n\n"}
        Todo y más lo podés encontrar acá
      </Text>

      <View style={styles.cardContainer}>
        {services.map((service, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.icon}>{service.icon}</Text>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
          </View>
        ))}
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
    marginBottom: 30,
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 22,
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 20,
  },
  card: {
    width: 180,
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  icon: {
    fontSize: 40,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
    color: colors.text.primary,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: "center",
    opacity: 0.8,
  },
});
