const prisma = require('../config/prisma');

// Verificar conexión a la base de datos
async function healthController(_req, res) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true });
  } catch (e) {
    console.error('Health error:', e);
    res.status(500).json({ ok: false, error: String(e) });
  }
}

module.exports = {
  healthController,
};
