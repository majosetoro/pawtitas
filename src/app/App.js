import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../shared/styles";

export default function MobilePage() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>PAWTITAS</Text>
        <View style={styles.navMenu}>
          {["Inicio", "Servicios", "Suscripciones", "Nosotros", "Contacto"].map(
            (item, idx) => (
              <Text key={idx} style={styles.navItem}>
                {item}
              </Text>
            )
          )}
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Cuidados para tu <Text style={styles.highlight}>mascota</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Bienvenidos a la App que te ayuda a cuidar a tu mejor amigo
        </Text>

        {/* Botones de descarga */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.playStore]}>
            <Text style={styles.buttonText}>Play Store</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.appStore]}>
            <Text style={styles.buttonText}>App Store</Text>
          </TouchableOpacity>
        </View>

        {/* Imagen central */}
        <Image
          source={{ uri: "https://via.placeholder.com/680x300" }}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fe9fc2ff", // color del Figma
  },
  navMenu: {
    flexDirection: "row",
    gap: 20,
  },
  navItem: {
    fontSize: 14,
    color: "#333",
  },
  hero: {
    alignItems: "center",
    padding: 20,
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  highlight: {
    color: "#f9bbd2ff", // rosado del Figma
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    maxWidth: 600,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  playStore: {
    backgroundColor: "#4d2d21", // marrón Play Store
  },
  appStore: {
    backgroundColor: "#f5a3c1ff", // rosado App Store
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
});
