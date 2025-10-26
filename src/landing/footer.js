import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import iconImage from "../../assets/icon.png";
import { colors } from "../shared/styles/colors";

export default function Footer({ scrollToSection, scrollToTop }) {
  return (
    <View style={styles.footer}>
      {/* Contenedor principal */}
      <View style={styles.container}>
        {/* Sección superior: Logo + Tagline + Links */}
        <View style={styles.topSection}>
          {/* Logo y marca */}
          <View style={styles.brandSection}>
            <Image
              source={iconImage}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.brandText}>
              <Text style={styles.appName}>Pawtitas</Text>
              <Text style={styles.tagline}>Conectando necesidades con servicios verificados 🐾</Text>
            </View>
          </View>

          {/* Links de navegación */}
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={scrollToTop}>
              <Text style={styles.linkText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection && scrollToSection("nosotros")}>
              <Text style={styles.linkText}>Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection && scrollToSection("contacto")}>
              <Text style={styles.linkText}>Contacto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sección inferior: Redes sociales + Copyright */}
        <View style={styles.bottomSection}>
          {/* Redes sociales */}
          <View style={styles.socials}>
            <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")} style={styles.socialIcon}>
              <FontAwesome name="facebook" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")} style={styles.socialIcon}>
              <FontAwesome name="instagram" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")} style={styles.socialIcon}>
              <FontAwesome name="twitter" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <Text style={styles.copyright}>© 2025 Pawtitas. Todos los derechos reservados.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.brand.footer,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  
  // Sección superior
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
    gap: 20,
  },
  
  // Marca (Logo + Nombre + Tagline)
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    minWidth: 250,
  },
  logo: {
    width: 46,
    height: 46,
    marginRight: 12,
  },
  brandText: {
    flexDirection: "column",
  },
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    opacity: 0.9,
  },
  
  // Links de navegación
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  linkText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  
  // Divisor
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginVertical: 14,
  },
  
  // Sección inferior
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  
  // Redes sociales
  socials: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  socialIcon: {
    opacity: 0.95,
  },
  
  // Copyright
  copyright: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
    opacity: 0.85,
  },
});
