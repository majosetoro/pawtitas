const prisma = require('../config/prisma');

/**
 * Crea un nuevo servicio
 */
async function create(data) {
  return prisma.servicio.create({ data });
}

/**
 * Actualiza un servicio
 */
async function update(id, data) {
  return prisma.servicio.update({ where: { id }, data });
}

/**
 * Busca o crea un servicio por descripción
 */
async function upsert(descripcion, data) {
  return prisma.servicio.upsert({
    where: { descripcion },
    update: {},
    create: data,
  });
}

/**
 * Busca el primer servicio de un prestador
 */
async function findFirstByPrestadorId(prestadorId) {
  const link = await prisma.prestadorservicio.findFirst({
    where: { prestadorId },
    orderBy: { id: 'desc' },
    select: { servicioId: true },
  });
  return link?.servicioId || null;
}

/**
 * Crea relación prestador-servicio
 */
async function createPrestadorServicio(prestadorId, servicioId) {
  return prisma.prestadorservicio.create({
    data: { prestadorId, servicioId },
  });
}

/**
 * Upsert relación prestador-servicio
 */
async function upsertPrestadorServicio(prestadorId, servicioId) {
  return prisma.prestadorservicio.upsert({
    where: {
      prestadorId_servicioId: { prestadorId, servicioId },
    },
    update: {},
    create: { prestadorId, servicioId },
  });
}

module.exports = {
  create,
  update,
  upsert,
  findFirstByPrestadorId,
  createPrestadorServicio,
  upsertPrestadorServicio,
};
