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
  ActivityIndicator,
} from "react-native";
import app from "../firebase/firebaseConfig";
import { FirebaseStatus } from "../shared/components";


import Servicios from "./servicios";
import Suscripciones from "./suscripciones";
import { colors, typography } from "../shared/styles";

// Importar las fuentes
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useFonts } from "expo-font";

export default function LandingApp() {
  // Cargar fuentes
  const [fontsLoaded, fontError] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    ...typography.styles.h2,
    color: colors.brand.logo,
  },
  navMenu: {
    flexDirection: "row",
    gap: 20,
  },
  navItem: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginHorizontal: 8,
  },
  hero: {
    alignItems: "center",
    padding: 20,
    textAlign: "center",
  },
  heroTitle: {
    ...typography.styles.h1,
    color: colors.text.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  highlight: {
    color: colors.brand.accent,
  },
  heroSubtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
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
    backgroundColor: colors.button.playStore,
  },
  appStore: {
    backgroundColor: colors.button.appStore,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    textAlign: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
});
