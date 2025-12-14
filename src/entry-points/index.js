// Punto central para la gestión de todos los entry points
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Configuración de entry points disponibles
export const ENTRY_POINTS = {
  LANDING: 'landing',
  APP: 'app',
};

// Configuración por defecto
export const DEFAULT_ENTRY_POINT = ENTRY_POINTS.APP;

// Función para obtener el entry point actual desde variables de entorno
export const getCurrentEntryPoint = () => {
  return Constants.expoConfig?.extra?.appType || DEFAULT_ENTRY_POINT;
};

// Función para validar entry point
export const isValidEntryPoint = (entryPoint) => {
  return Object.values(ENTRY_POINTS).includes(entryPoint);
};

// Función para obtener el componente del entry point
export const getEntryPointComponent = (entryPoint) => {
  try {
    switch(entryPoint) {
      case ENTRY_POINTS.LANDING:
        return require('../landing/App').default;
      case ENTRY_POINTS.APP:
        return require('../main-app/App').default;
      default:
        throw new Error(`Entry point no válido: ${entryPoint}`);
    }
  } catch (error) {
    console.error(`❌ [ENTRY POINT] Error cargando: ${entryPoint}`, error);
    throw error;
  }
};

// Función para obtener información del entry point actual
export const getCurrentEntryPointInfo = () => {
  const current = getCurrentEntryPoint();
  const info = {
    [ENTRY_POINTS.LANDING]: {
      name: 'Landing Page',
      description: 'Pantalla de bienvenida y onboarding',
      teamMember: 'Frontend Developer',
      features: ['Onboarding', 'Registro', 'Login'],
      path: 'src/landing',
    },
    [ENTRY_POINTS.APP]: {
      name: 'Main Application',
      description: 'Aplicación principal con funcionalidades completas',
      teamMember: 'Mobile Developer',
      features: ['Dashboard', 'Funcionalidades', 'Navegación'],
      path: 'src/main-app',
    },
  };
  
  return info[current] || info[DEFAULT_ENTRY_POINT];
};

// Función para obtener información de debug
export const getDebugInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    entryPoint: getCurrentEntryPoint(),
    environment: __DEV__ ? 'development' : 'production',
    timestamp: new Date().toISOString(),
  };
};

// Función para validar entry points
export const validateEntryPoints = () => {
  const results = {};
  
  Object.values(ENTRY_POINTS).forEach(entryPoint => {
    try {
      getEntryPointComponent(entryPoint);
      results[entryPoint] = { status: 'OK', error: null };
    } catch (error) {
      results[entryPoint] = { status: 'ERROR', error: error.message };
    }
  });
  
  return results;
};

// Exportar configuración por defecto
export default {
  ENTRY_POINTS,
  DEFAULT_ENTRY_POINT,
  getCurrentEntryPoint,
  getEntryPointComponent,
  getCurrentEntryPointInfo,
  getDebugInfo,
  validateEntryPoints,
};
