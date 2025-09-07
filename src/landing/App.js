// Componente principal de la Landing Page
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import app from "../firebase/firebaseConfig";
import { FirebaseStatus } from "../shared/components";
import { colors } from "../shared/styles";
import Servicios from "./servicios";
import Suscripciones from "./suscripciones";


export default function LandingApp() {
  return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
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
          Bienvenidos a la App que te ayuda con el cuidado de tu mejor amigo
        </Text>

        {/* Botones */}
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

      {/* Secciones */}
      <Servicios />
      <Suscripciones />

      {/* Footer técnico */}
      <FirebaseStatus />

    </ScrollView>
  </SafeAreaView>
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
    color: "#feb9d2ff",
  },
  navMenu: {
    flexDirection: "row",
    gap: 20,
  },
  navItem: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 8,
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
    color: "#fea5c6ff",
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
    backgroundColor: "#4d2d21",
  },
  appStore: {
    backgroundColor: "#c94f7c",
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
