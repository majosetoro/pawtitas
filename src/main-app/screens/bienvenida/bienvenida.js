import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from "react-native";
import Logo from "../../assets/icon.png";
import { colors, typography } from "../../../shared/styles";

export default function BienvenidaScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>PAWTITAS</Text>
        <Text style={styles.subtitle}>Encontrá el servicio ideal para tu mascota</Text>

      <Image
        source={Logo}
        style={styles.heroImage}
        resizeMode="contain"
      />

      {/* Opciones */}
      <View style={styles.card}>
        <Text style={styles.emoji}>🏠</Text>
        <Text style={styles.cardText}>Cuidador</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.emoji}>🦮</Text>
        <Text style={styles.cardText}>Paseador</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.emoji}>🚑</Text>
        <Text style={styles.cardText}>Emergencias</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.emoji}>🐾</Text>
        <Text style={styles.cardText}>Veterinaria</Text>
      </View>

      {/* Botones */}
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Inicio")}
        >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={styles.secondaryText}>Registrarse</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: colors.background, 
    padding: 20 
  },
  logo: { 
    fontSize: 28, 
    fontFamily: typography.fontFamily.title,
    color: colors.brand.highlight, 
    marginBottom: 10,
    letterSpacing: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    padding: 15,
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
  },
  emoji: { fontSize: 28, marginRight: 15 },
  cardText: { 
    fontSize: 16, 
    fontFamily: typography.fontFamily.bodyMedium,
    color: colors.text.primary 
  },
  subtitle: { 
    fontSize: 18, 
    fontFamily: typography.fontFamily.body,
    color: colors.brand.highlight 
  },

  button: {
    backgroundColor: colors.button.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { 
    color: colors.text.inverse, 
    fontSize: 16,
    fontFamily: typography.fontFamily.bodySemiBold,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.button.primary,
  },
  secondaryText: { 
    color: colors.button.primary, 
    fontSize: 16,
    fontFamily: typography.fontFamily.bodySemiBold,
  },

   heroImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
  }
});
