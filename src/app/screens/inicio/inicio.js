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
import iconImage from '../../assets/icon.png';

export default function InicioScreen({ navigation }) {
  const [form, setForm] = useState({ correo: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // Lógica de autenticación.
    console.log("Datos de login:", form); // Luego de implementar la lógica y testear, eliminar esta línea
    
    // Navegar a la pantalla Home después del login
    navigation.navigate("Home");
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

          <View style={styles.registerContainer}>
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
