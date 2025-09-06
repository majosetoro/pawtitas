import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import app from '../firebase/firebaseConfig';
import { FirebaseStatus } from '../shared/components';
import { colors } from '../shared/styles';

export default function App() {
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
});