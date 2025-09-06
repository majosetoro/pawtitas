const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configuración para múltiples entry points con Expo
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configurar alias para importaciones
config.resolver.alias = {
  '@app': path.resolve(__dirname, 'src/app'),
  '@landing': path.resolve(__dirname, 'src/landing'),
  '@shared': path.resolve(__dirname, 'src/shared'),
  '@assets': path.resolve(__dirname, 'assets'),
  '@entry-points': path.resolve(__dirname, 'src/entry-points'),
  '@config': path.resolve(__dirname, 'src/config'),
};

// Configuración para entry points múltiples
config.resolver.entryPoints = {
  landing: path.resolve(__dirname, 'src/entry-points/landing.js'),
  app: path.resolve(__dirname, 'src/entry-points/app.js'),
};

// Optimizaciones para rendimiento
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Configuración para hot reload y desarrollo en equipo
config.server = {
  port: 8081,
  enhanceMiddleware: (middleware, server) => {
    return (req, res, next) => {
      // Log para debugging en equipo
      if (req.url.includes('/landing') || req.url.includes('/app')) {
        console.log(`[Metro] Serving: ${req.url}`);
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;