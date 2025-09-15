import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader, GuardarCancelarBtn, FloatingMessage } from "../../../components";
import { styles } from "./editarPerfil.styles";
import PerfilFactory from "./roles/PerfilFactory";
import ROLES from "./roles/types";

// Componente principal para la pantalla de editar perfil
export default function EditarPerfil({ navigation, route }) {
  // Obtener el rol del usuario
  const userRole = route?.params?.role || ROLES.PET_OWNER;
  
  // Estado del formulario inicializado según el rol
  const [formData, setFormData] = useState(PerfilFactory.getInitialFormState(userRole));

  // Estado de la aplicación
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showFloatingMessage, setShowFloatingMessage] = useState(false);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    loadProfileData();
  }, [userRole]);

  // Cargar los datos del perfil del usuario con una API
  // Implementar la llamada a la API
  const loadProfileData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cargar datos del usuario según su rol
      setFormData(PerfilFactory.getInitialFormState(userRole));
    } catch (error) {
      setMessage({ type: "error", text: "Error al cargar los datos del perfil" });
      setShowFloatingMessage(true);
    } finally {
      setLoading(false);
    }
  };

  // Manejar el cambio en los campos del formulario
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Validar los datos del formulario
  const validateForm = () => {
    const newErrors = PerfilFactory.validateForm(formData, userRole);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el guardado del perfil
  const handleSave = async () => {
    if (!validateForm()) {
      setMessage({ type: "error", text: "Por favor, corrige los errores en el formulario" });
      setShowFloatingMessage(true);
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });
    setShowFloatingMessage(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage({ type: "success", text: "Perfil actualizado exitosamente" });
      setShowFloatingMessage(true);
      
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar el perfil. Inténtalo de nuevo." });
      setShowFloatingMessage(true);
    } finally {
      setSaving(false);
    }
  };

  // Manejar la navegación hacia atrás
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Manejar el ocultamiento del mensaje flotante
  const handleHideFloatingMessage = () => {
    setShowFloatingMessage(false);
    setMessage({ type: "", text: "" });
  };

  // Título
  const getTitleByRole = () => "Editar Perfil";

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f9bbd2ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Mensaje flotante */}
      <FloatingMessage
        message={message.text}
        type={message.type}
        visible={showFloatingMessage}
        onHide={handleHideFloatingMessage}
        duration={4000}
      />

      <ScreenHeader
        title={getTitleByRole()}
        subtitle="Tu perfil es tu carta de presentación, ¡mantenlo al día!"
        onBackPress={handleBackPress}
      />
      
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          style={styles.formContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Información importante */}
          {userRole !== ROLES.ADMIN && (
            <View style={styles.additionalInfoContainer}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoIcon}>ℹ️</Text>
                <Text style={styles.additionalInfoTitle}>Información importante</Text>
              </View>
              <View style={styles.infoContent}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.additionalInfoText}>
                    Todos los campos son obligatorios
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.additionalInfoText}>
                    Tu información será visible para otros usuarios de la plataforma
                  </Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoBullet}>•</Text>
                  <Text style={styles.additionalInfoText}>
                    Tu perfil está protegido y solo se usa para conectar con la comunidad
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Renderizar el formulario según el rol utilizando Factory Pattern*/}
          {PerfilFactory.createProfileForm(userRole, { formData, handleInputChange, errors })}
        </ScrollView>

        {/* Botones de cancelar y guardar */}
        <View style={styles.buttonContainer}>
          <GuardarCancelarBtn
            label="Guardar"
            onPress={handleSave}
            loading={saving}
            disabled={saving}
            showCancel={true}
            onCancel={handleBackPress}
            cancelLabel="Cancelar"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}