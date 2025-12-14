/**
 * MapaController
 * Controlador para gestionar la lógica de negocio del mapa OSM
 * Separa la lógica de la presentación (UI) siguiendo principios SOLID
 */

import { Alert } from 'react-native';
import {
  searchAddress,
  findNearbyVeterinaries,
  findNearbyPetshops,
  findNearbyParks,
  getRoute,
  formatDistance,
  formatDuration,
} from '../../services/osmService';

// Configuración del mapa
export const MAPA_CONFIG = {
  // Región inicial (Buenos Aires)
  DEFAULT_REGION: {
    latitude: -34.6037,
    longitude: -58.3816,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  },

  // Radio de búsqueda para POIs (en metros) - reducido para evitar timeouts
  SEARCH_RADIUS: 2000,

  // Debounce para búsqueda de direcciones (ms)
  SEARCH_DEBOUNCE: 500,

  // Tipos de POI
  POI_TYPES: {
    NONE: 'none',
    VETERINARIES: 'veterinaries',
    PETSHOPS: 'petshops',
    PARKS: 'parks',
  },

  // Perfiles de ruta
  ROUTE_PROFILES: {
    DRIVING: 'driving-car',
    WALKING: 'foot-walking',
  },

  // Configuración de marcadores
  MARKER_COLORS: {
    USER: '#f5a3c1ff',
    VETERINARY: '#ef4444',
    PETSHOP: '#3b82f6',
    PARK: '#22c55e',
  },

  // Configuración de botones POI
  POI_BUTTONS: [
    {
      type: 'veterinaries',
      label: 'Veterinarias',
      icon: 'medical',
      activeColor: '#ef4444',
    },
    {
      type: 'petshops',
      label: 'Pet Shops',
      icon: 'storefront',
      activeColor: '#3b82f6',
    },
    {
      type: 'parks',
      label: 'Parques',
      icon: 'leaf',
      activeColor: '#22c55e',
    },
  ],

  // Padding para ajustar vista de ruta
  ROUTE_EDGE_PADDING: {
    top: 100,
    right: 50,
    bottom: 100,
    left: 50,
  },
};

const POI_LOADERS = {
  [MAPA_CONFIG.POI_TYPES.VETERINARIES]: findNearbyVeterinaries,
  [MAPA_CONFIG.POI_TYPES.PETSHOPS]: findNearbyPetshops,
  [MAPA_CONFIG.POI_TYPES.PARKS]: findNearbyParks,
};

export class MapaController {
  /**
   * Obtener estado inicial del mapa
   */
  static getInitialState() {
    return {
      region: MAPA_CONFIG.DEFAULT_REGION,
      mapHeading: 0,
      searchQuery: '',
      searchResults: [],
      isSearching: false,
      showSearchResults: false,
      activePOIType: MAPA_CONFIG.POI_TYPES.NONE,
      pois: [],
      isLoadingPOIs: false,
      selectedDestination: null,
      routeCoordinates: [],
      routeInfo: null,
      routeProfile: MAPA_CONFIG.ROUTE_PROFILES.WALKING, // Por defecto: caminando
      isLoadingRoute: false,
    };
  }

  /**
   * Buscar dirección usando Nominatim
   * @param {string} query - Texto de búsqueda
   * @param {Object} userLocation - Ubicación del usuario para filtrar resultados
   * @returns {Promise<Array>} - Resultados de búsqueda
   */
  static async searchAddress(query, userLocation = null) {
    if (!query || query.trim().length < 3) {
      return [];
    }

    try {
      const results = await searchAddress(query, 5, userLocation);
      return results;
    } catch (error) {
      console.error('Error en MapaController.searchAddress:', error);
      Alert.alert('Error', 'No se pudo buscar la dirección. Contactá a soporte.');
      throw error;
    }
  }

  /**
   * Cargar POIs según tipo
   * @param {string} type - Tipo de POI (veterinaries, petshops, parks)
   * @param {Object} userLocation - { latitude, longitude }
   * @returns {Promise<Array>} - Lista de POIs
   */
  static async loadPOIs(type, userLocation) {
    if (!userLocation) {
      Alert.alert(
        'Ubicación requerida',
        'Necesitas activar tu ubicación para ver lugares cercanos'
      );
      return [];
    }

    const loader = POI_LOADERS[type];
    if (!loader) {
      return [];
    }

    try {
      const { latitude, longitude } = userLocation;
      const radius = MAPA_CONFIG.SEARCH_RADIUS;
      const results = await loader(latitude, longitude, radius);

      if (results.length === 0) {
        Alert.alert(
          'Sin resultados',
          'No se encontraron lugares cercanos de este tipo. Intenta aumentar el área de búsqueda.'
        );
      }

      return results;
    } catch (error) {
      return this.handlePoiError(error);
    }
  }

  /**
   * Calcular ruta entre origen y destino
   * @param {Object} origin - { latitude, longitude }
   * @param {Object} destination - { latitude, longitude }
   * @param {string} profile - 'driving-car' o 'foot-walking'
   * @returns {Promise<Object>} - Información de ruta
   */
  static async calculateRoute(origin, destination, profile) {
    if (!origin) {
      Alert.alert(
        'Ubicación requerida',
        'Necesitas activar tu ubicación para calcular rutas'
      );
      return null;
    }

    try {
      const route = await getRoute(origin, destination, profile);
      return route;
    } catch (error) {
      return this.handleRouteError(error);
    }
  }

  /**
   * Obtener configuración de región para centrar el mapa
   * @param {Object} location - { latitude, longitude }
   * @param {number} zoom - Nivel de zoom (latitudeDelta)
   * @returns {Object} - Configuración de región
   */
  static getRegionForLocation(location, zoom = 0.01) {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: zoom,
      longitudeDelta: zoom,
    };
  }

  /**
   * Obtener color de marcador según tipo de POI
   * @param {string} poiType - Tipo de POI
   * @returns {string} - Color del marcador
   */
  static getMarkerColor(poiType) {
    switch (poiType) {
      case 'veterinary':
        return MAPA_CONFIG.MARKER_COLORS.VETERINARY;
      case 'petshop':
        return MAPA_CONFIG.MARKER_COLORS.PETSHOP;
      case 'park':
        return MAPA_CONFIG.MARKER_COLORS.PARK;
      default:
        return MAPA_CONFIG.MARKER_COLORS.USER;
    }
  }

  /**
   * Validar si el texto de búsqueda es válido
   * @param {string} query - Texto de búsqueda
   * @returns {boolean}
   */
  static isValidSearchQuery(query) {
    return query && query.trim().length >= 3;
  }

  /**
   * Obtener perfil de ruta opuesto (para toggle)
   * @param {string} currentProfile - Perfil actual
   * @returns {string} - Perfil opuesto
   */
  static toggleRouteProfile(currentProfile) {
    return currentProfile === MAPA_CONFIG.ROUTE_PROFILES.DRIVING
      ? MAPA_CONFIG.ROUTE_PROFILES.WALKING
      : MAPA_CONFIG.ROUTE_PROFILES.DRIVING;
  }

  /**
   * Formatear información de ruta para mostrar
   * @param {Object} route - Ruta calculada
   * @returns {Object} - { distance, duration, profile }
   */
  static formatRouteInfo(route) {
    if (!route) return null;

    return {
      distance: formatDistance(route.distance),
      duration: formatDuration(route.duration),
      profile: route.profile,
    };
  }

  /**
   * Validar si hay ubicación disponible
   * @param {Object} userLocation - Ubicación del usuario
   * @returns {boolean}
   */
  static hasUserLocation(userLocation) {
    return userLocation && userLocation.latitude && userLocation.longitude;
  }

  /**
   * Obtener mensaje de error según tipo
   * @param {string} errorType - Tipo de error
   * @returns {Object} - { title, message }
   */
  static getErrorMessage(errorType) {
    const errors = {
      NO_LOCATION: {
        title: 'Ubicación requerida',
        message: 'Necesitas activar tu ubicación para usar esta función',
      },
      SEARCH_FAILED: {
        title: 'Error',
        message: 'No se pudo buscar la dirección. Contactá a soporte.',
      },
      POIS_FAILED: {
        title: 'Error',
        message: 'No se pudieron cargar los lugares cercanos',
      },
      ROUTE_FAILED: {
        title: 'Error',
        message: 'No se pudo calcular la ruta. Contactá a soporte.',
      },
      NO_RESULTS: {
        title: 'Sin resultados',
        message: 'No se encontraron lugares cercanos de este tipo',
      },
    };

    return errors[errorType] || errors.SEARCH_FAILED;
  }

  /**
   * Validar configuración del mapa antes de operaciones
   * @param {Object} config - { userLocation, mapRef }
   * @returns {boolean}
   */
  static validateMapConfiguration(config) {
    const { userLocation, mapRef } = config;

    if (!this.hasUserLocation(userLocation)) {
      const error = this.getErrorMessage('NO_LOCATION');
      Alert.alert(error.title, error.message);
      return false;
    }

    return true;
  }

  /**
   * Manejo centralizado de errores en carga de POIs
   * @param {Error} error
   * @returns {Array}
   */
  static handlePoiError(error) {
    console.error('Error en MapaController.loadPOIs:', error);

    if (error?.message?.includes('Timeout')) {
      Alert.alert(
        'Búsqueda muy lenta',
        'La búsqueda tardó demasiado. Intenta de nuevo o busca en otra zona.'
      );
      return [];
    }

    if (error?.message?.includes('504')) {
      Alert.alert(
        'Servidor ocupado',
        'El servidor de búsqueda está muy ocupado. Intenta de nuevo en unos segundos.'
      );
      return [];
    }

    Alert.alert('Error', 'No se pudieron cargar los lugares cercanos. Intenta de nuevo.');
    return [];
  }

  /**
   * Manejo centralizado de errores en cálculo de rutas
   * @param {Error} error
   * @returns {null}
   */
  static handleRouteError(error) {
    console.error('Error en MapaController.calculateRoute:', error);

    const message = error?.message || '';

    if (message.includes('429')) {
      console.warn('Rate limit alcanzado. Intenta de nuevo en unos segundos.');
      Alert.alert(
        'Servidor ocupado',
        'El servidor está muy ocupado. Intenta de nuevo en unos segundos.'
      );
      return null;
    }

    if (message.includes('Timeout')) {
      Alert.alert(
        'Tiempo de espera agotado',
        'El servidor tardó demasiado en responder. Verifica tu conexión a internet e intenta de nuevo.'
      );
      return null;
    }

    if (message.includes('Network request failed')) {
      Alert.alert(
        'Sin conexión',
        'No se pudo conectar al servidor. Verifica tu conexión a internet.'
      );
      return null;
    }

    Alert.alert(
      'Error al calcular ruta',
      'No se pudo calcular la ruta. Intenta de nuevo más tarde.'
    );
    return null;
  }
}

