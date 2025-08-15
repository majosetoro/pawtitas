import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import app from './firebase/firebaseConfig';
import { getApps } from 'firebase/app';

export default function App() {
  const isFirebaseInitialized = getApps().length > 0;

  return (
    <View style={styles.container}>
      <Text>Bienvenidas a Pawtitas</Text>
      <Text>Esto se editó en App.js</Text>
      <Text>
        {isFirebaseInitialized
          ? "Firebase conectado correctamente"
          : "Error de conexión con Firebase"}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});