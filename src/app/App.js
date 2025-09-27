import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { colors, typography } from "../shared/styles";
import SplashScreen from "./screens/splash/splash";
import BienvenidaScreen from "./screens/bienvenida/bienvenida";
import RegistroScreen from "./screens/registro/registro";
import InicioScreen from "./screens/inicio/inicio";
import HomeScreen from "./screens/home/home";
import CuidadoresScreen from "./screens/cuidadores/Cuidadores";
import PaseadoresScreen from "./screens/paseadores/Paseadores";
import PerfilScreen from "./screens/perfil/perfil";
import EditarPerfil from "./screens/perfil/editarPerfil/editarPerfil";
import MisMascotasScreen from "./screens/misMascotas/MisMascotas";
import PanelAdminScreen from "./screens/panelAdmin";
import ValidarUsuarioScreen from "./screens/panelAdmin/ValidarUsuario/ValidarUsuario";
// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importar fuentes de Google
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

const Stack = createNativeStackNavigator();

function MobilePage() {
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

export default function App() {
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
        <Text style={[typography.styles.body, styles.loadingText]}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cuidadores" component={CuidadoresScreen} />
        <Stack.Screen name="Paseadores" component={PaseadoresScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="MisMascotas" component={MisMascotasScreen} />
        <Stack.Screen name="PanelAdmin" component={PanelAdminScreen} />
        <Stack.Screen name="ValidarUsuario" component={ValidarUsuarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
