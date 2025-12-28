// Configuración dinámica para Expo
// Este archivo permite tener múltiples entry points

// Obtener el tipo de app desde las variables de entorno
const appType = process.env.EXPO_PUBLIC_APP_TYPE || 'app';

// Configuración base común para ambos tipos de app
const baseConfig = {
  name: "Pawtitas",
  slug: "pawtitas",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    backgroundColor: "#ffffff",
    resizeMode: "contain"
  },
  plugins: [
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Permitir a Pawtitas usar tu ubicación para encontrar servicios cercanos a ti."
      }
    ]
  ],
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSLocationWhenInUseUsageDescription: "Pawtitas necesita tu ubicación para mostrarte servicios y lugares cercanos en el mapa.",
      NSLocationAlwaysUsageDescription: "Pawtitas necesita tu ubicación para mostrarte servicios cercanos."
    }
  },
  web: {
    favicon: "./assets/favicon.ico"
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
      edgeToEdgeEnabled: true,
      softwareKeyboardLayoutMode: "pan",
      permissions: [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "INTERNET"
      ],
      usesCleartextTraffic: true
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
