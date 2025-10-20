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
import { SafeAreaView } from "react-native-safe-area-context";
import Servicios from "./servicios";
import Suscripciones from "./suscripciones";
import Contacto from "./contacto";
import Nosotros from "./nosotros";
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
  const serviciosRef = useRef(null);
  const suscripcionesRef = useRef(null);
  const nosotrosRef = useRef(null);
  const contactoRef = useRef(null);

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.navMenu}>
            <TouchableOpacity
              onPress={() => scrollRef.current.scrollTo({ y: 0, animated: true })}
            >
              <Text style={styles.navItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(serviciosRef)}>
              <Text style={styles.navItem}>Servicios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(suscripcionesRef)}>
              <Text style={styles.navItem}>Suscripciones</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(nosotrosRef)}>
              <Text style={styles.navItem}>Nosotros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(contactoRef)}>
              <Text style={styles.navItem}>Contacto</Text>
            </TouchableOpacity>
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
            Bienvenidos a la App que te ayuda con el cuidado de tu mejor amigo.
          </Text>
          <Text style={styles.heroSubtitle}>Disponible en</Text>

          {/* Botones */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.playStore]}>
              <Text style={styles.buttonText}>Play Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.appStore]}>
              <Text style={styles.buttonText}>App Store</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Secciones con refs */}
    <View onLayout={(e) => onSectionLayout("servicios", e)}>
      <Servicios />
    </View>
    <View onLayout={(e) => onSectionLayout("suscripciones", e)}>
      <Suscripciones />
    </View>
    <View onLayout={(e) => onSectionLayout("nosotros", e)}>
      <Nosotros />
    </View>
    <View onLayout={(e) => onSectionLayout("contacto", e)}>
      <Contacto />
    </View>



        {/* Footer */}
        <Footer />

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
    ...typography.styles.h1,
    color: colors.brand.logo,
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 5,
  },
  navMenu: {
    flexDirection: "row",
    gap: 20,
  },
  navItem: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginHorizontal: 2,
  },
  hero: {
    alignItems: "center",
    padding: 20,
    textAlign: "center",
  },
  heroTitle: {
    ...typography.styles.h2,
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
