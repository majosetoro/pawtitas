import React from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import iconImage from "../../../assets/icon.png";
import { colors } from "../../shared/styles/colors";
import styles from "./Footer.styles";

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
              <Text style={styles.tagline}>Conectando necesidades con servicios verificados ❤️</Text>
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
