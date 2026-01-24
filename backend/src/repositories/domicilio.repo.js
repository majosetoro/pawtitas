const prisma = require('../config/prisma');

/**
 * Crea un nuevo domicilio
 */
async function create(data) {
  return prisma.domicilio.create({ data });
}

/**
 * Actualiza un domicilio
 */
async function update(id, data) {
  return prisma.domicilio.update({ where: { id }, data });
}

module.exports = {
  create,
  update,
};
