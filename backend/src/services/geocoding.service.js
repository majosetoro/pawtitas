/**
 * Geocoding con Nominatim (OpenStreetMap).
 * Obtiene coordenadas a partir de una dirección.
 */

const NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'Pawtitas-Backend';

function buildParams(query, countrycodes = 'ar') {
  const params = { q: query, format: 'json', limit: 1 };
  if (countrycodes) params.countrycodes = countrycodes;
  return new URLSearchParams(params);
}

async function fetchCoords(query, countrycodes) {
  const response = await fetch(`${NOMINATIM_API}?${buildParams(query, countrycodes)}`, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!response.ok) return null;
  const data = await response.json();
  if (!data?.length) return null;
  const { lat, lon } = data[0];
  return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
}

/**
 * Geocodifica una dirección en Argentina.
 * @param {string} address - Dirección (ej: "Virrey del Pino, 100, Belgrano")
 * @returns {Promise<{latitude: number, longitude: number} | null>}
 */
async function geocodeAddress(address) {
  const trimmed = address?.trim();
  if (!trimmed || trimmed === 'No especificado') return null;

  try {
    const withCountry = trimmed.toLowerCase().includes('argentina')
      ? trimmed
      : `${trimmed}, Argentina`;

    let coords = await fetchCoords(withCountry, 'ar');
    if (!coords) {
      await new Promise((r) => setTimeout(r, 300));
      coords = await fetchCoords(withCountry, null);
    }
    return coords;
  } catch {
    return null;
  }
}

/**
 * Construye el string de dirección desde domicilio.
 * @param {Object} domicilio - { calle, numero, ciudad }
 * @returns {string}
 */
function buildAddressString(domicilio) {
  if (!domicilio) return '';
  const { calle, numero, ciudad } = domicilio;
  const parts = [calle, numero, ciudad].filter(Boolean);
  return parts.join(', ');
}

/**
 * Obtiene coordenadas para un domicilio y las devuelve (no persiste).
 * @param {Object} domicilio - { calle, numero, ciudad }
 * @returns {Promise<{latitude: number, longitude: number} | null>}
 */
async function getCoordinatesForDomicilio(domicilio) {
  const address = buildAddressString(domicilio);
  if (!address) return null;
  return geocodeAddress(address);
}

module.exports = {
  geocodeAddress,
  buildAddressString,
  getCoordinatesForDomicilio,
};
