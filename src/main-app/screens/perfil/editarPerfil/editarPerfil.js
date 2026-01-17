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
import { ScreenHeader, GuardarCancelarBtn, MensajeFlotante, MenuInferior } from "../../../components";
import { styles } from "./editarPerfil.styles";
import PerfilFactory from "./roles/PerfilFactory";
import ROLES from "./roles/types";
import { useAuth } from "../../../contexts";

const buildLocation = (user) => {
  if (!user) return "";
  if (user.domicilio) {
    const { calle, numero, ciudad } = user.domicilio;
    const calleNumero = [calle, numero].filter(Boolean).join(' ');
    return ciudad ? `${calleNumero}, ${ciudad}` : calleNumero;
  }
  return user.ubicacion || "";
};

const buildFullName = (user) => {
  const full = [user?.nombre, user?.apellido].filter(Boolean).join(' ').trim();
  return full || user?.name || "";
};

const buildFormDataFromUser = (role, userData) => {
  const base = PerfilFactory.getInitialFormState(role);
  if (!userData) return base;

  const next = { ...base };

  if ("avatarUri" in next) next.avatarUri = userData.avatar || null;
  if ("nombreApellido" in next) next.nombreApellido = buildFullName(userData);
  if ("descripcion" in next) next.descripcion = userData.descripcion || next.descripcion;
  if ("email" in next) next.email = userData.email || next.email;
  if ("telefono" in next) next.telefono = userData.celular || userData.telefono || next.telefono;
  if ("ubicacion" in next) next.ubicacion = buildLocation(userData);

  return next;
};

// Componente principal para la pantalla de editar perfil
export default function EditarPerfil({ navigation, route }) {
  const { user, role: authRole } = useAuth();

  // Obtener el rol del usuario
  const userRole = route?.params?.role || authRole || ROLES.DUENIO;

  // Estado del formulario inicializado según el rol
  const [formData, setFormData] = useState(() => buildFormDataFromUser(userRole, user));

  // Estado de la aplicación
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showMensajeFlotante, setShowMensajeFlotante] = useState(false);

  // Cargar datos del perfil al montar el componente
  useEffect(() => {
    loadProfileData();
  }, [userRole, user]);

  // Cargar los datos del perfil del usuario
  const loadProfileData = async () => {
    setLoading(true);
    try {
      const hydrated = buildFormDataFromUser(userRole, user);
      setFormData(hydrated);
    } catch (error) {
      setMessage({ type: "error", text: "Error al cargar los datos del perfil" });
      setShowMensajeFlotante(true);
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
      setShowMensajeFlotante(true);
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });
    setShowMensajeFlotante(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage({ type: "success", text: "Perfil actualizado exitosamente" });
      setShowMensajeFlotante(true);
      
    } catch (error) {
      setMessage({ type: "error", text: "Error al guardar el perfil. Inténtalo de nuevo." });
      setShowMensajeFlotante(true);
    } finally {
      setSaving(false);
    }
  };

  // Manejar la navegación hacia atrás
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Manejar el ocultamiento del mensaje flotante
  const handleHideMensajeFlotante = () => {
    setShowMensajeFlotante(false);
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
      <MensajeFlotante
        message={message.text}
        type={message.type}
        visible={showMensajeFlotante}
        onHide={handleHideMensajeFlotante}
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
                    Tu información será visible para otros usuarios de la plataforma, a excepción de tu email y teléfono
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
      
      {/* Barra de navegación inferior */}
      <MenuInferior />
    </SafeAreaView>
  );
}