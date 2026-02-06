import { getPrestadoresPorPerfil } from '../../services';

export class PrestadorController {
  static async getPrestadores(perfil, ciudad = null) {
    try {
      const response = await getPrestadoresPorPerfil(perfil, ciudad);
      if (response.success && response.data) {
        return this.mapPrestadores(response.data);
      }
      return [];
    } catch (error) {
      console.error(`Error al cargar prestadores (${perfil}):`, error);
      throw new Error('No se pudieron cargar los prestadores. Intenta nuevamente.');
    }
  }

  static mapPrestadores(prestadores) {
    if (!Array.isArray(prestadores)) {
      return [];
    }

    return prestadores.map((prestador) => this.mapPrestador(prestador));
  }

  static mapPrestador(prestador) {
    const { 
      id, 
      nombreCompleto, 
      domicilio, 
      servicio,
      celular,
      perfil 
    } = prestador;

    return {
      id: id?.toString() || '',
      nombre: nombreCompleto || 'Sin nombre',
      rating: 0, // TODO: Implementar sistema de ratings
      descripcion: servicio?.descripcion || 'Sin descripción',
      precio: this.formatPrecio(servicio?.precio),
      ubicacion: domicilio?.ubicacion || 'No especificado',
      disponibilidad: servicio?.horarios || 'A convenir',
      horario: servicio?.duracion || 'A convenir',
      // Coordenadas desde backend (geocoding al guardar domicilio)
      latitude: domicilio?.latitude ?? null,
      longitude: domicilio?.longitude ?? null,
      // Tipo de prestador
      tipo: perfil || '',
      // Datos adicionales
      celular: celular || '',
      tipoMascota: servicio?.tipoMascota || '',
      disponible: servicio?.disponible ?? true,
    };
  }

  /**
   * Formatea el precio a formato argentino
   * @param {number|string} precio - Precio a formatear
   * @returns {string} Precio formateado
   */
  static formatPrecio(precio) {
    if (!precio || precio === 0) {
      return 'A convenir';
    }

    const precioNumerico = Number(precio);
    if (isNaN(precioNumerico)) {
      return 'A convenir';
    }

    return `$${precioNumerico.toLocaleString('es-AR')}`;
  }

  /**
   * Filtra prestadores por texto de búsqueda
   * @param {Array} prestadores - Array de prestadores
   * @param {string} searchText - Texto de búsqueda
   * @returns {Array} Prestadores filtrados
   */
  static filterBySearch(prestadores, searchText) {
    if (!searchText || searchText.trim() === '') {
      return prestadores;
    }

    const search = searchText.toLowerCase();
    return prestadores.filter((prestador) =>
      prestador.nombre.toLowerCase().includes(search) ||
      prestador.ubicacion.toLowerCase().includes(search) ||
      prestador.descripcion.toLowerCase().includes(search)
    );
  }

  /**
   * Ordena prestadores por distancia (más cercanos primero)
   * @param {Array} prestadores - Array de prestadores
   * @returns {Array} Prestadores ordenados
   */
  static sortByDistance(prestadores) {
    return [...prestadores].sort((a, b) => {
      if (a.distance === null && b.distance === null) return 0;
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
  }

  /**
   * Ordena prestadores por rating (mejor calificación primero)
   * @param {Array} prestadores - Array de prestadores
   * @returns {Array} Prestadores ordenados
   */
  static sortByRating(prestadores) {
    return [...prestadores].sort((a, b) => b.rating - a.rating);
  }

  /**
   * Ordena prestadores por precio (menor precio primero)
   * @param {Array} prestadores - Array de prestadores
   * @returns {Array} Prestadores ordenados
   */
  static sortByPrice(prestadores) {
    return [...prestadores].sort((a, b) => {
      const precioA = this.extractPrecioNumerico(a.precio);
      const precioB = this.extractPrecioNumerico(b.precio);
      
      // Los "A convenir" van al final
      if (precioA === Infinity && precioB === Infinity) return 0;
      if (precioA === Infinity) return 1;
      if (precioB === Infinity) return -1;
      
      return precioA - precioB;
    });
  }

  /**
   * Extrae el valor numérico de un precio formateado
   * @param {string} precio - Precio formateado
   * @returns {number} Valor numérico
   */
  static extractPrecioNumerico(precio) {
    if (precio === 'A convenir') {
      return Infinity;
    }
    const numerico = parseInt(precio.replace(/[^0-9]/g, ''));
    return isNaN(numerico) ? Infinity : numerico;
  }

  /**
   * Obtiene los tipos de prestadores disponibles
   * @returns {Array} Array de tipos
   */
  static getTiposPrestadores() {
    return [
      { key: 'cuidador', label: 'Cuidador' },
      { key: 'paseador', label: 'Paseador' },
      { key: 'salud', label: 'Salud' },
    ];
  }

  /**
   * Valida si un perfil es válido
   * @param {string} perfil - Perfil a validar
   * @returns {boolean} True si es válido
   */
  static isPerfilValido(perfil) {
    const perfiles = ['cuidador', 'paseador', 'salud'];
    return perfiles.includes(perfil?.toLowerCase());
  }
}
