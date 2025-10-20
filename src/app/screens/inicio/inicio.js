import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./inicio.styles";
import LoginInputField from "../../components/inputs/loginInputField";
import LoginBtn from "../../components/buttons/loginBtn";
import { colors } from "../../../shared/styles";
import iconImage from "../../assets/icon.png";

const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE_URL || "http://192.168.1.94:3001";

export default function InicioScreen({ navigation }) {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
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

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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

          <LoginInputField
            label="Email"
            placeholder="tu@email.com"
            value={form.correo}
            onChangeText={(value) => handleInputChange("correo", value)}
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <LoginInputField
            label="Contraseña"
            placeholder="••••••••"
            value={form.password}
            onChangeText={(value) => handleInputChange("password", value)}
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

          <LoginBtn label="INICIAR SESIÓN" onPress={handleLogin} />

          <View className={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tenés cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
