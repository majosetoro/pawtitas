const prisma = require('../config/prisma');

/**
 * Busca o crea un género
 */
async function upsert(nombre) {
  return prisma.genero.upsert({
    where: { nombre },
    update: {},
    create: { nombre },
  });
}

module.exports = {
  upsert,
};
