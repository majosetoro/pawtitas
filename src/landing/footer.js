import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* Logo + nombre */}
      <View style={styles.brand}>
        <Image
          source="./assets/icon.png"
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Pawtitas</Text>
      </View>

      {/* Descripción */}
      <Text style={styles.description}>
        Conectando necesidades con servicios verificados. 🐾 
      </Text>

      {/* Links */}
      <View style={styles.links}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Nosotros</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Contacto</Text>
        </TouchableOpacity>
      </View>

      {/* Redes sociales */}
      <View style={styles.socials}>
        <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
          <FontAwesome name="facebook" size={28} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
          <FontAwesome name="instagram" size={28} color="#fff" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
          <FontAwesome name="twitter" size={28} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Copyright */}
      <Text style={styles.copy}>© 2025 Pawtitas. Todos los derechos reservados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8bfecff", // verde pawtitas (ajustar a tu branding)
    padding: 20,
    alignItems: "center",
    marginTop: 40,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  links: {
    flexDirection: "row",
    marginBottom: 15,
  },
  linkText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  socials: {
    flexDirection: "row",
    marginBottom: 15,
  },
  icon: {
    marginHorizontal: 10,
  },
  copy: {
    fontSize: 12,
    color: "#f7f5f5ff",
  },
});
