import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./suscripciones.styles";
import { colors } from "../../../../shared/styles";
import { MensajeFlotante } from "../../../components";
import { PlanCard, getPlansByProfileType } from "../../../components/Suscripciones";

export default function SuscripcionesScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { tipoPerfil } = route.params || {};
  const [successMessage, setSuccessMessage] = useState("");

  const mostrarSeccion = getPlansByProfileType(tipoPerfil);

  const handleConsultarPlan = (planTitulo, esPremium) => {
    if (tipoPerfil === "prestador") {
      setSuccessMessage("¡Listo! Tu registro fue exitoso. Revisaremos tus datos y te notificaremos por correo cuando tu cuenta esté habilitada.");
    } else if (tipoPerfil === "dueno") {
      setSuccessMessage("¡Bienvenido/a! Tu registro fue exitoso, ya podés usar la app.");
    }
  };

  const handleHideMessage = () => {
    setSuccessMessage("");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!mostrarSeccion) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={colors.text.secondary} />
          <Text style={styles.errorText}>
            No se ha especificado un tipo de perfil válido
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.topBackButton} 
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        <Text style={styles.topBackButtonText}>Volver</Text>
      </TouchableOpacity>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: mostrarSeccion.color }]}>Suscripciones</Text>
        <Text style={styles.description}>
          {tipoPerfil === "dueno" 
            ? "Elegí un plan y empezá hoy" 
            : "Tu talento, más visible. Nosotros te damos las herramientas"}
        </Text>
        <View style={styles.plansContainer}>
          {mostrarSeccion.planes.map((plan, index) => (
            <PlanCard
              key={index}
              titulo={plan.titulo}
              precio={plan.precio}
              esGratis={plan.esGratis}
              esPremium={plan.esPremium}
              colorPrincipal={mostrarSeccion.color}
              caracteristicas={plan.caracteristicas}
              onConsultar={() => handleConsultarPlan(plan.titulo, plan.esPremium)}
            />
          ))}
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>
            Cancelá cuando quieras · Sin compromisos
          </Text>
        </View>
      </ScrollView>

      <MensajeFlotante
        visible={!!successMessage}
        message={successMessage}
        type="success"
        onHide={handleHideMessage}
        duration={5000}
        position="top"
      />
    </View>
  );
}