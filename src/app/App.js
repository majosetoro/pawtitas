import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import app from '../firebase/firebaseConfig';
import { FirebaseStatus } from '../shared/components';
import { colors, typography } from '../shared/styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Muestra pantalla en blanco mientras cargan las fuentes
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidas a Pawtitas</Text>
      <Text style={styles.subtitle}>App Mobile</Text>
      <FirebaseStatus />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: typography.fontFamily.titleBold,
    fontSize: typography.fontSize.xxl,
    color: colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: typography.fontFamily.text,
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: 20,
  },
});