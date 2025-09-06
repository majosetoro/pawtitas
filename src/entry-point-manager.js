// Gestor de Entry Points para Expo
// Este archivo maneja la lógica de entry points de manera compatible con Expo

import { Platform } from 'react-native';

// Configuración de entry points
export const ENTRY_POINTS = {
  LANDING: 'landing',
  APP: 'app',
};

// Configuración por defecto
export const DEFAULT_ENTRY_POINT = ENTRY_POINTS.LANDING;

// Función para obtener el entry point actual
export const getCurrentEntryPoint = () => {
  // Prioridad: APP_TYPE > EXPO_ENTRY_POINT > DEFAULT
  return process.env.APP_TYPE || process.env.EXPO_ENTRY_POINT || DEFAULT_ENTRY_POINT;
};

// Función para validar entry point
export const isValidEntryPoint = (entryPoint) => {
  return Object.values(ENTRY_POINTS).includes(entryPoint);
};

// Función para obtener el componente del entry point
export const getEntryPointComponent = (entryPoint) => {
  try {
    if (entryPoint === ENTRY_POINTS.LANDING) {
      return require('./landing/App').default;
    } else if (entryPoint === ENTRY_POINTS.APP) {
      return require('./app/App').default;
    } else {
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
      description: 'Pantalla de bienvenida y panel de admin',
      features: ['Bienvenida', 'Panel de Admin', 'Login'],
      path: 'src/landing',
    },
    [ENTRY_POINTS.APP]: {
      name: 'Main Application',
      description: 'Aplicación principal con funcionalidades completas',
      features: ['Dashboard', 'Funcionalidades', 'Navegación'],
      path: 'src/app',
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
    nodeEnv: process.env.NODE_ENV,
    expoEntryPoint: process.env.EXPO_ENTRY_POINT,
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

// Función para cambiar entry point dinámicamente (solo en desarrollo)
export const switchEntryPoint = (newEntryPoint) => {
  if (__DEV__ && isValidEntryPoint(newEntryPoint)) {
    process.env.EXPO_ENTRY_POINT = newEntryPoint;
    console.log(`🔄 [ENTRY POINT] Cambiado a: ${newEntryPoint}`);
    return true;
  }
  return false;
};

// Función para obtener logs del equipo
export const getTeamLogs = () => {
  const current = getCurrentEntryPoint();
  const info = getCurrentEntryPointInfo();
  
  return {
    entryPoint: current,
    features: info.features,
    path: info.path,
    platform: Platform.OS,
    environment: __DEV__ ? 'Development' : 'Production',
  };
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
  switchEntryPoint,
  getTeamLogs,
};
