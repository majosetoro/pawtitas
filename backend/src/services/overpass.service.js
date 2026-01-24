const { 
  OVERPASS_SERVERS, 
  OVERPASS_TIMEOUT_MS, 
  OVERPASS_MAX_RETRIES 
} = require('../config/constants');

// Consultar Overpass API con reintentos
async function queryOverpassWithRetry(query) {
  if (!query) {
    throw new Error('missing query');
  }

  const encodedQuery = encodeURIComponent(query);

  for (let attempt = 0; attempt < OVERPASS_MAX_RETRIES; attempt++) {
    const server = OVERPASS_SERVERS[attempt % OVERPASS_SERVERS.length];
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OVERPASS_TIMEOUT_MS);

    try {
      const url = `${server}?data=${encodedQuery}`;
      const response = await fetch(url, { method: 'GET', signal: controller.signal });
      clearTimeout(timer);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timer);
      // Lanzar error si es el último intento
      if (attempt === OVERPASS_MAX_RETRIES - 1) {
        throw new Error(`timeout: ${error.message}`);
      }
    }
  }

  throw new Error('timeout');
}

module.exports = {
  queryOverpassWithRetry,
};
