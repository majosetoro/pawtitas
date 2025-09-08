import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from "react-native";
import Logo from "../../assets/icon.png";

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
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  logo: { fontSize: 28, fontWeight: "bold", color: "#fda7a7ff", marginBottom: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f1eb",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
  },
  emoji: { fontSize: 28, marginRight: 15 },
  cardText: { fontSize: 16, color: "#6b4226" },
  subtitle: { fontSize: 18, color: "#fda7a7ff" },

  button: {
    backgroundColor: "#966443ff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6b4226",
  },
  secondaryText: { color: "#6b4226", fontSize: 16, fontWeight: "600" },

   heroImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
  }
});
