/**
 * Construye string de horarios desde objeto de disponibilidad
 * @param {Object} availability - Objeto con días como keys y boolean como values
 * @returns {string} Días separados por coma
 */
function buildHorariosFromAvailability(availability = {}) {
  const days = Object.entries(availability)
    .filter(([, value]) => value === true)
    .map(([key]) => key);
  return days.join(',');
}

/**
 * Construye string de perfil desde objeto de servicios
 * @param {Object} services - Objeto con tipos de servicio
 * @returns {string} Servicios separados por coma
 */
function buildPerfilFromServices(services = {}) {
  const labels = {
    cuidador: 'Cuidador',
    paseador: 'Paseador',
    veterinarioDomicilio: 'Veterinario a domicilio',
    clinicaVeterinaria: 'Clínica Veterinaria',
  };

  const selected = Object.entries(services)
    .filter(([, value]) => value === true)
    .map(([key]) => labels[key])
    .filter(Boolean);

  return selected.join(',');
}

/**
 * Construye string de tipos de mascota desde objeto
 * @param {Object} petTypes - Objeto con tipos de mascota
 * @param {string} petTypesCustom - Tipo personalizado
 * @returns {string} Tipos de mascota separados por coma
 */
function buildTipoMascotaFromPetTypes(petTypes = {}, petTypesCustom = '') {
  const labels = {
    perro: 'Perro',
    gato: 'Gato',
    conejo: 'Conejo',
    ave: 'Ave',
    roedor: 'Roedor',
    otro: petTypesCustom ? petTypesCustom.trim() : 'Otro',
  };

  const selected = Object.entries(petTypes)
    .filter(([, value]) => value === true)
    .map(([key]) => labels[key])
    .filter(Boolean);

  return selected.length ? selected.join(',') : 'General';
}

module.exports = {
  buildHorariosFromAvailability,
  buildPerfilFromServices,
  buildTipoMascotaFromPetTypes,
};
