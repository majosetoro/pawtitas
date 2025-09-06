// Configuración dinámica para Expo
// Este archivo permite tener múltiples entry points

// Obtener el tipo de app desde las variables de entorno
const appType = process.env.EXPO_PUBLIC_APP_TYPE || 'app'; // Por defecto es 'app'

// Configuración base común para ambos tipos de app
const baseConfig = {
  name: "Pawtitas",
  slug: "pawtitas",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  web: {
    favicon: "./assets/icon.png"
  },
  // Añadir variables de entorno que serán accesibles en la app
  extra: {
    appType: appType
  }
};

// Configuraciones específicas para cada tipo de app
const appConfigs = {
  app: {
    name: "Pawtitas",
    slug: "pawtitas-app",
    android: {
      package: "com.pawtitas.app",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#FDFDFD"
      },
      edgeToEdgeEnabled: true
    }
  },
  landing: {
    name: "Pawtitas",
    slug: "pawtitas-landing",
    android: {
      package: "com.pawtitas.landing",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#FDFDFD"
      },
      edgeToEdgeEnabled: true
    }
  }
};

// Combinar la configuración base con la específica del tipo de app
const config = {
  ...baseConfig,
  ...appConfigs[appType],
  // Asegurar que la variable extra.appType persista
  extra: {
    ...baseConfig.extra,
    ...(appConfigs[appType].extra || {})
  }
};

module.exports = {
  expo: config
};
