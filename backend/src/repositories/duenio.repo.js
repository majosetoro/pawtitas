const prisma = require('../config/prisma');

/**
 * Crea o actualiza un dueño
 */
async function upsert(usuarioId, comentarios) {
  return prisma.duenio.upsert({
    where: { usuarioId },
    update: { comentarios },
    create: { usuarioId, comentarios },
  });
}

/**
 * Crea un dueño
 */
async function create(data) {
  return prisma.duenio.create({ data });
}

module.exports = {
  upsert,
  create,
};
