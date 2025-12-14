// Servicios de OpenStreetMap para mapas, búsqueda y POIs
// Nominatim: geocoding, Overpass: POIs, OpenRouteService: rutas

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const OVERPASS_BASE = 'https://overpass-api.de/api/interpreter';
const ORS_BASE = 'https://api.openrouteservice.org/v2';

// OpenRouteService - Lee desde .env con fallback
const ORS_API_KEY = process.env.EXPO_PUBLIC_ORS_API_KEY;

// Log para verificar la carga (útil para debug)
console.log('[osmService] ORS API Key:', ORS_API_KEY ? '✓ Cargada' : '✗ Error');
console.log('[osmService] Fuente:', process.env.EXPO_PUBLIC_ORS_API_KEY ? '.env' : 'fallback');

// Headers requeridos por Nominatim
const NOMINATIM_HEADERS = {
  'User-Agent': 'Pawtitas/1.0',
};

const DEFAULT_TIMEOUT = 15000;
const OVERPASS_HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded' };

const fetchJsonWithTimeout = async (
  url,
  options = {},
  {
    timeoutMs = DEFAULT_TIMEOUT,
    timeoutMessage = 'Timeout',
    errorPrefix = 'Request',
  } = {}
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });

    if (!response.ok) {
      throw new Error(`${errorPrefix} error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(timeoutMessage);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

const runOverpassQuery = async (query) =>
  fetchJsonWithTimeout(
    OVERPASS_BASE,
    {
      method: 'POST',
      headers: OVERPASS_HEADERS,
      body: `data=${encodeURIComponent(query)}`,
    },
    {
      timeoutMs: DEFAULT_TIMEOUT,
      timeoutMessage: 'Timeout: La búsqueda tardó demasiado',
      errorPrefix: 'Overpass',
    }
  );

const mapOverpassPOI = (element, baseData) => {
  const latitude = element.lat || element.center?.lat;
  const longitude = element.lon || element.center?.lon;

  if (!latitude || !longitude) {
    return null;
  }

  return {
    id: element.id,
    latitude,
    longitude,
    ...baseData,
  };
};

// Búsqueda de direcciones usando Nominatim (forward geocoding)
export const searchAddress = async (query, limit = 5, userLocation = null) => {
  if (!query || query.trim().length < 3) {
    return [];
  }

  try {
    let url = `${NOMINATIM_BASE}/search?format=json&q=${encodeURIComponent(query)}&limit=${limit}&addressdetails=1`;
    
    // Restringir búsqueda al área del usuario
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      const delta = 15; // ~1500-1650km aproximadamente (cubre todo el país)
      
      const viewbox = [
        longitude - delta,
        latitude + delta,
        longitude + delta,
        latitude - delta,
      ].join(',');
      
      url += `&viewbox=${viewbox}&bounded=1`;
    }
    
    const data = await fetchJsonWithTimeout(
      url,
      { headers: NOMINATIM_HEADERS },
      {
        timeoutMs: DEFAULT_TIMEOUT,
        timeoutMessage: 'Timeout: La búsqueda tardó demasiado',
        errorPrefix: 'Nominatim',
      }
    );
    
    // Mapear a formato consistente
    return data.map(item => ({
      id: item.place_id,
      name: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      type: item.type,
      address: item.address,
    }));
  } catch (error) {
    console.error('Error en searchAddress:', error);
    throw error;
  }
};

// Convertir coordenadas a dirección
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const url = `${NOMINATIM_BASE}/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
    
    const data = await fetchJsonWithTimeout(
      url,
      { headers: NOMINATIM_HEADERS },
      {
        timeoutMs: DEFAULT_TIMEOUT,
        timeoutMessage: 'Timeout: La búsqueda tardó demasiado',
        errorPrefix: 'Nominatim reverse',
      }
    );
    
    return {
      name: data.display_name,
      address: data.address,
      latitude,
      longitude,
    };
  } catch (error) {
    console.error('Error en reverseGeocode:', error);
    throw error;
  }
};

// Buscar veterinarias cercanas usando Overpass API
export const findNearbyVeterinaries = async (latitude, longitude, radius = 2000) => {
  try {
    // Buscar veterinarias cercanas
    const query = `
      [out:json][timeout:15];
      (
        nwr(around:${radius},${latitude},${longitude})["amenity"="veterinary"];
      );
      out center;
    `;
    const data = await runOverpassQuery(query);
    
    // Mapear a formato consistente
    return data.elements
      .map(element =>
        mapOverpassPOI(element, {
          type: 'veterinary',
          name: element.tags?.name || 'Veterinaria',
          address: formatAddress(element.tags),
          phone: element.tags?.phone,
          website: element.tags?.website,
          opening_hours: element.tags?.opening_hours,
        })
      )
      .filter(Boolean);
  } catch (error) {
    console.error('Error en findNearbyVeterinaries:', error);
    
    throw error;
  }
};

// Buscar petshops cercanos
export const findNearbyPetshops = async (latitude, longitude, radius = 2000) => {
  try {
    const query = `
      [out:json][timeout:15];
      (
        nwr(around:${radius},${latitude},${longitude})["shop"="pet"];
        nwr(around:${radius},${latitude},${longitude})["shop"="pet_grooming"];
      );
      out center;
    `;
    const data = await runOverpassQuery(query);
    
    return data.elements
      .map(element =>
        mapOverpassPOI(element, {
          type: 'petshop',
          name: element.tags?.name || 'Petshop',
          address: formatAddress(element.tags),
          phone: element.tags?.phone,
          website: element.tags?.website,
          opening_hours: element.tags?.opening_hours,
          shop_type: element.tags?.shop, // 'pet' o 'pet_grooming'
        })
      )
      .filter(Boolean);
  } catch (error) {
    console.error('Error en findNearbyPetshops:', error);
    
    throw error;
  }
};

// Buscar parques cercanos
export const findNearbyParks = async (latitude, longitude, radius = 2000) => {
  try {
    const query = `
      [out:json][timeout:15];
      (
        nwr(around:${radius},${latitude},${longitude})["leisure"="park"];
      );
      out center;
    `;
    const data = await runOverpassQuery(query);
    
    return data.elements
      .map(element =>
        mapOverpassPOI(element, {
          type: 'park',
          name: element.tags?.name || 'Parque',
          address: formatAddress(element.tags),
          area: element.tags?.area,
          surface: element.tags?.surface,
        })
      )
      .filter(Boolean);
  } catch (error) {
    console.error('Error en findNearbyParks:', error);
    
    throw error;
  }
};

// Obtener ruta entre dos puntos usando OpenRouteService
export const getRoute = async (origin, destination, profile = 'driving-car') => {
  try {
    // Mapear perfiles a los nombres de ORS
    const orsProfile = profile === 'foot-walking' ? 'foot-walking' : 'driving-car';
    
    const url = `${ORS_BASE}/directions/${orsProfile}/geojson`;
    
    const body = {
      coordinates: [
        [origin.longitude, origin.latitude],
        [destination.longitude, destination.latitude]
      ],
    };
    
    console.log('[ORS] Enviando request:', { url, body, profile: orsProfile });
    
    const data = await fetchJsonWithTimeout(
      url,
      {
        method: 'POST',
        headers: {
          'Authorization': ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
      {
        timeoutMs: DEFAULT_TIMEOUT,
        timeoutMessage: 'Timeout: El servidor tardó demasiado en responder',
        errorPrefix: 'OpenRouteService',
      }
    );

    console.log('[ORS] Respuesta recibida (features):', data.features?.length || 0);

    // Validar respuesta básica
    if (!data || typeof data !== 'object') {
      console.error('[ORS] Respuesta inválida:', data);
      throw new Error('Respuesta inválida del servidor');
    }

    // Manejar errores de la API
    if (data.error) {
      console.error('[ORS] Error de API:', data.error);
      throw new Error(data.error.message || 'Error al calcular ruta');
    }

    if (!data.features || !Array.isArray(data.features) || data.features.length === 0) {
      console.error('[ORS] No se encontraron rutas:', data);
      throw new Error('No se encontró ruta');
    }

    const feature = data.features[0];
    console.log('[ORS] Feature seleccionado:', {
      geometry: feature.geometry?.type,
      coords: feature.geometry?.coordinates?.length,
      properties: Object.keys(feature.properties || {})
    });
    
    // Extraer coordenadas del GeoJSON
    if (!feature.geometry || !feature.geometry.coordinates || !Array.isArray(feature.geometry.coordinates)) {
      console.error('[ORS] Geometría inválida:', feature.geometry);
      throw new Error('Formato de ruta inválido');
    }

    // Convertir a formato [lat, lon]
    const coordinates = feature.geometry.coordinates.map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));

    console.log('[ORS] Coordenadas extraídas:', coordinates.length);

    // Validar propiedades
    if (!feature.properties || !feature.properties.summary) {
      console.error('[ORS] Falta información de summary');
      throw new Error('Información de ruta incompleta');
    }

    return {
      coordinates,
      distance: feature.properties.summary.distance || 0, // en metros
      duration: feature.properties.summary.duration || 0, // en segundos
      profile: orsProfile,
      steps: feature.properties.segments?.[0]?.steps || [],
    };
  } catch (error) {
    console.error('Error en getRoute:', error);
    
    // Mensajes de error
    if (error?.message?.includes('403') || error?.message?.includes('401')) {
      throw new Error('Error de autenticación con OpenRouteService. Verifica la API key.');
    }
    
    if (error?.message?.includes('429')) {
      throw new Error('Límite de requests alcanzado. Intenta de nuevo en unos minutos.');
    }
    
    throw error;
  }
};

// Formatear distancia para mostrar
export const formatDistance = (distanceMeters) => {
  if (!distanceMeters) return '';
  
  if (distanceMeters < 1000) {
    return `${Math.round(distanceMeters)} m`;
  }
  
  return `${(distanceMeters / 1000).toFixed(1)} km`;
};

// Formatear duración para mostrar
export const formatDuration = (durationSeconds) => {
  if (!durationSeconds) return '';
  
  const minutes = Math.round(durationSeconds / 60);
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return remainingMinutes > 0 
    ? `${hours}h ${remainingMinutes}min`
    : `${hours}h`;
};

// Formatear dirección desde tags
const formatAddress = (tags) => {
  if (!tags) return '';
  
  const parts = [];
  
  if (tags['addr:street']) {
    const street = tags['addr:street'];
    const housenumber = tags['addr:housenumber'];
    parts.push(housenumber ? `${street} ${housenumber}` : street);
  }
  
  if (tags['addr:city']) {
    parts.push(tags['addr:city']);
  }
  
  if (tags['addr:suburb']) {
    parts.push(tags['addr:suburb']);
  }
  
  return parts.join(', ') || tags.name || '';
};

