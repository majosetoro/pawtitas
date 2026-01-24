const prisma = require('../config/prisma');

/**
 * Busca un prestador por usuarioId
 */
async function findByUsuarioId(usuarioId) {
  return prisma.prestador.findUnique({
    where: { usuarioId },
    include: {
      prestadorservicio: {
        take: 1,
        orderBy: { id: 'desc' },
        include: { servicio: true },
      },
    },
  });
}

/**
 * Crea o actualiza un prestador
 */
async function upsert(usuarioId, data) {
  return prisma.prestador.upsert({
    where: { usuarioId },
    update: data.update || {},
    create: { usuarioId, ...data.create },
  });
}

/**
 * Actualiza un prestador
 */
async function update(id, data) {
  return prisma.prestador.update({
    where: { id },
    data,
  });
}

/**
 * Crea un prestador
 */
async function create(data) {
  return prisma.prestador.create({ data });
}

module.exports = {
  findByUsuarioId,
  upsert,
  update,
  create,
};
