// Componente principal de la Landing Page
import React, { useRef } from "react";
import Logo from "../../../assets/icon.png";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./App.styles";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Servicios from "../servicios/Servicios";
import Suscripciones from "../suscripciones/Suscripciones";
import Contacto from "../contacto/Contacto";
import Nosotros from "../nosotros/Nosotros";
import Features from "../features/Features";
import ComoFunciona from "../comoFunciona/ComoFunciona";
import Footer from "../footer/Footer";
import { colors } from "../../shared/styles";

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
