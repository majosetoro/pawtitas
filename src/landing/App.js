// Componente principal de la Landing Page
import React, { useRef } from "react";
import Logo from "../../assets/icon.png";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Servicios from "./servicios";
import Suscripciones from "./suscripciones";
import Contacto from "./contacto";
import Nosotros from "./nosotros";
import Features from "./features";
import ComoFunciona from "./comoFunciona";
import Footer from "./footer";
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
  const scrollRef = useRef(null);
  const sectionPositions = useRef({});

const onSectionLayout = (key, event) => {
  sectionPositions.current[key] = event.nativeEvent.layout.y;
};

const scrollToSection = (key) => {
  if (sectionPositions.current[key] !== undefined) {
    scrollRef.current.scrollTo({
      y: sectionPositions.current[key],
      animated: true,
    });
  }
};


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
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.navContainer}>
              <View style={styles.navMenu}>
                <TouchableOpacity
                  onPress={() => scrollRef.current.scrollTo({ y: 0, animated: true })}
                >
                  <Text style={styles.navItem}>Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection("servicios")}>
                  <Text style={styles.navItem}>Servicios</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection("comoFunciona")}>
                  <Text style={styles.navItem}>Cómo Funciona</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection("suscripciones")}>
                  <Text style={styles.navItem}>Suscripciones</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection("nosotros")}>
                  <Text style={styles.navItem}>Nosotros</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => scrollToSection("contacto")}>
                  <Text style={styles.navItem}>Contacto</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Logo */}
          <Text style={styles.logo}>PAWTITAS</Text>

          {/* Imagen central */}
          <Image source={Logo} style={styles.heroImage} resizeMode="contain" />

          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>
              Cuidados para tu <Text style={styles.highlight}>mascota</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Bienvenidos a la App que te ayuda con el cuidado de tu mejor amigo
            </Text>
            <Text style={styles.heroSubtitle}>Disponible en</Text>

            {/* Botones */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.playStore]}>
                <Text style={styles.buttonText}>Play Store</Text>
              </TouchableOpacity>
              <View style={styles.appStoreContainer}>
                <TouchableOpacity style={[styles.button, styles.appStore]}>
                  <Text style={styles.buttonText}>App Store</Text>
                </TouchableOpacity>
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Próximamente</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Secciones con refs */}
      <Features />
      <View onLayout={(e) => onSectionLayout("servicios", e)}>
        <Servicios />
      </View>
      <View onLayout={(e) => onSectionLayout("comoFunciona", e)}>
        <ComoFunciona />
      </View>
      <View onLayout={(e) => onSectionLayout("suscripciones", e)}>
        <Suscripciones scrollToSection={scrollToSection} />
      </View>
      <View onLayout={(e) => onSectionLayout("nosotros", e)}>
        <Nosotros />
      </View>
      <View onLayout={(e) => onSectionLayout("contacto", e)}>
        <Contacto />
      </View>

          {/* Footer */}
          <Footer 
            scrollToSection={scrollToSection}
            scrollToTop={() => scrollRef.current.scrollTo({ y: 0, animated: true })}
          />

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLanding,
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
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    flexWrap: "wrap",
  },
  navContainer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  logo: {
    ...typography.styles.h1,
    color: colors.brand.logo,
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 0,
  },
  navMenu: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  navItem: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    textAlign: "center",
  },
  heroTitle: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  highlight: {
    color: colors.brand.accentLanding,
  },
  heroSubtitle: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: 16,
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 22,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    borderWidth: 2,
  },
  playStore: {
    backgroundColor: colors.button.playStore,
  },
  appStore: {
    backgroundColor: colors.button.appStore,
    borderWidth: 0,
  },
  appStoreContainer: {
    position: "relative",
  },
  comingSoonBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: colors.button.secondary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    textAlign: "center",
    fontWeight: "600",
  },
  heroImage: {
    width: "100%",
    height: 200,
    marginTop: 5,
    marginBottom: 20,
  },
});
