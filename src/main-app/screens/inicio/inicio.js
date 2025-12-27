import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./inicio.styles";
import LoginInputField from "../../components/inputs/loginInputField";
import LoginBtn from "../../components/buttons/loginBtn";
import { colors } from "../../../shared/styles";
import iconImage from "../../assets/icon.png";
import { useStreamChat } from "../../contexts";

const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.1.31:3001";

export default function InicioScreen({ navigation }) {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ correo: "", password: "" });
  const [touched, setTouched] = useState({ correo: false, password: false });
  const { initializeChat } = useStreamChat();

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "El email es requerido";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Ingresa un email válido";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "La contraseña es requerida";
    }
    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return "";
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[field]) {
      const error = field === "correo" 
        ? validateEmail(value) 
        : validatePassword(value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // Validar al perder el foco
    const error = field === "correo" 
      ? validateEmail(form[field]) 
      : validatePassword(form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleLogin = async () => {
    setTouched({ correo: true, password: true });

    const emailError = validateEmail(form.correo);
    const passwordError = validatePassword(form.password);

    setErrors({
      correo: emailError,
      password: passwordError,
    });

    // Si hay errores, no continuar
    if (emailError || passwordError) {
      return;
    }

    try {
      if (!API_BASE) {
        alert("No se configuró la URL del backend (EXPO_PUBLIC_API_BASE_URL).");
        return;
      }

      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.correo,      // el backend espera "email"
          password: form.password, // y "password"
        }),
      });

      // intenta parsear JSON aunque la respuesta no sea 2xx
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        // Inicializar el chat
        await initializeChat(
          data.user.id,      // ID único del usuario
          data.user.nombre,  // Nombre a mostrar
          data.tokenStream,      // Token generado por tu backend
          data.user.avatar,   // URL del avatar (opcional)
          data.user.tipo_usuario  // Rol del usuario (Duenio, Cuidador, Paseador, Veterinario, Admin)
        );

        if (data.admin) {
          navigation.navigate("PanelAdmin");
        } else if (data.user) {
          navigation.navigate("Home");
        } else {
          alert("Inicio de sesión correcto, pero rol no identificado.");
        }
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      console.log("Login error:", error?.message);
      alert("No se pudo conectar al servidor");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      enabled
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          enableOnAndroid={true}
          nestedScrollEnabled={true}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={iconImage}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>¡Bienvenido de vuelta!</Text>
            <Text style={styles.welcomeMessage}>
              Conéctate con quienes aman y cuidan mascotas todos los días
            </Text>

            <View style={styles.inputContainer}>
              <LoginInputField
                label="Email"
                placeholder="tu@email.com"
                value={form.correo}
                onChangeText={(value) => handleInputChange("correo", value)}
                onBlur={() => handleBlur("correo")}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              {touched.correo && errors.correo ? (
                <Text style={styles.errorText}>{errors.correo}</Text>
              ) : (
                <View style={{ height: 20 }} />
              )}
            </View>

            <View style={styles.inputContainer}>
              <LoginInputField
                label="Contraseña"
                placeholder="••••••••"
                value={form.password}
                onChangeText={(value) => handleInputChange("password", value)}
                onBlur={() => handleBlur("password")}
                secureTextEntry={!showPassword}
                rightComponent={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={18}
                      color={colors.text.secondary}
                    />
                  </TouchableOpacity>
                }
              />
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <View style={{ height: 20 }} />
              )}
            </View>

            <LoginBtn 
              label="INICIAR SESIÓN" 
              onPress={handleLogin}
            />

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tenés cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
                <Text style={styles.registerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
