/**
 * Divide un string "Nombre Apellido" en sus componentes
 * @param {string} nombreApellido - String con nombre y apellido
 * @returns {Object} { nombre, apellido }
 */
function splitNombreApellido(nombreApellido) {
  const txt = String(nombreApellido || '').trim();
  if (!txt) return { nombre: '', apellido: '' };
  const [nombre, ...resto] = txt.split(/\s+/);
  return { nombre, apellido: resto.join(' ') };
}

module.exports = {
  splitNombreApellido,
};
