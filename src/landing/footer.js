import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import iconImage from "../../assets/icon.png";
import { colors } from "../shared/styles/colors";

export default function Footer({ scrollToSection, scrollToTop }) {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Contenido principal */}
        <View style={styles.mainContent}>
          {/* Logo y marca */}
          <TouchableOpacity onPress={scrollToTop} style={styles.brandSection}>
            <Image
              source={iconImage}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.brandText}>
              <Text style={styles.appName}>Pawtitas</Text>
              <Text style={styles.tagline}>Conectando necesidades con servicios verificados 🐾</Text>
            </View>
          </TouchableOpacity>

          {/* Redes sociales */}
          <View style={styles.socials}>
            <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
              <FontAwesome name="facebook" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
              <FontAwesome name="instagram" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
              <FontAwesome name="twitter" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Links de navegación */}
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={scrollToTop}>
            <Text style={styles.linkText}>Inicio</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>•</Text>
          <TouchableOpacity onPress={() => scrollToSection && scrollToSection("servicios")}>
            <Text style={styles.linkText}>Servicios</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>•</Text>
          <TouchableOpacity onPress={() => scrollToSection && scrollToSection("nosotros")}>
            <Text style={styles.linkText}>Nosotros</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>•</Text>
          <TouchableOpacity onPress={() => scrollToSection && scrollToSection("contacto")}>
            <Text style={styles.linkText}>Contacto</Text>
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <Text style={styles.copyright}>
          © 2025 Pawtitas • Hecho con 🐾 para tu mejor amigo
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.surface,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 60,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  container: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    gap: 6,
  },
  
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
    gap: 16,
  },
  
  // Marca minimalista
  brandSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 28,
    height: 28,
  },
  brandText: {
    flexDirection: "column",
    gap: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.brand.accentLanding,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "400",
    opacity: 0.85,
  },
  
  // Links de navegación
  navLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  linkText: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  separator: {
    fontSize: 14,
    color: colors.text.disabled,
  },
  
  // Redes sociales
  socials: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  
  // Copyright
  copyright: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.8,
  },
});
