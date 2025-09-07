import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Podrías usar íconos de react-native-vector-icons o imágenes
const services = [
  { title: "Cuidadores", icon: "🏠" },
  { title: "Paseadores", icon: "🦮" },
  { title: "Emergencias", icon: "🚑" },
  { title: "Veterinarios", icon: "🐾" },
];

export default function Servicios() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Nuestros servicios</Text>
      <Text style={styles.subtitle}>
        Contamos con todas las opciones para el cuidado de tu mascota, ¿Te vas de viaje y necesitas cuidador?
        ¿Buscás paseador? ¿Necesitás veterinaria cercana o a domicilio? ¿Tenés una emergencia?
        Todo y más lo podés encontraca acá.
      </Text>

      <View style={styles.cardContainer}>
        {services.map((service, idx) => (
          <View key={idx} style={styles.card}>
            <Text style={styles.icon}>{service.icon}</Text>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardSubtitle}>
              Encontrar servicio cercano.
            </Text>
          </View>
        ))}
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#6b2d1d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    maxWidth: 600,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 15,
  },
  card: {
    width: 160,
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
