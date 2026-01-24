const { queryOverpassWithRetry } = require('../services/overpass.service');

// Proxy de Overpass API
async function overpassController(req, res) {
  try {
    const { query } = req.query;
    const data = await queryOverpassWithRetry(query);
    return res.json(data);
  } catch (error) {
    if (error.message.includes('missing query')) {
      return res.status(400).json({ error: 'missing query' });
    }
    return res.status(504).json({ 
      error: 'timeout', 
      detail: error.message 
    });
  }
}

module.exports = {
  overpassController,
};
