// Punto de entrada principal que decide qué aplicación cargar
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Determinar qué punto de entrada cargar basado en EXPO_PUBLIC_APP_TYPE
const appType = Constants.expoConfig?.extra?.appType || 'app';

console.log(`🚀 Starting PAWTITAS - Entry Point Router`);
console.log(`📱 Platform: ${Platform.OS}`);
console.log(`🔧 Environment: ${__DEV__ ? 'Development' : 'Production'}`);
console.log(`🔍 EXPO_PUBLIC_APP_TYPE: ${Constants.expoConfig?.extra?.appType || 'no definido'}`);

// Instrucciones para el equipo
console.log('\n📋 INSTRUCCIONES PARA EL EQUIPO:');
console.log('🚀 Landing Page: npm run start:landing');
console.log('📱 App Principal: npm run start:app');
console.log('📊 Test Entry Points: npm run test:entry-points');

// Para debug - mostrar todas las variables disponibles
if (__DEV__) {
  console.log(`\n🔍 [DEBUG] Constants:`, JSON.stringify(Constants.expoConfig || {}, null, 2));
}

// Cargar el entry point apropiado según appType
if (appType === 'landing') {
  console.log('📱 Cargando Landing Page...');
  require('./entry-points/landing');
} else {
  console.log('📱 Cargando App Principal...');
  require('./entry-points/app');
}
