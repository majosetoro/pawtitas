// Entry point para la landing page
import { registerRootComponent } from 'expo';
import LandingApp from '../landing/App';
import Constants from 'expo-constants';

// Logs para debugging
console.log('🚀 PAWTITAS - Landing Page iniciada');
console.log(`🔍 APP_TYPE: ${Constants.expoConfig?.extra?.appType || 'no definido'}`);

// Registrar el componente raíz para la landing page
registerRootComponent(LandingApp);
