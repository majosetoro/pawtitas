// Configuración de conexiones
export const CONEXIONES_CONFIG = {
  FLOATING_MESSAGE_DURATION: 4000,
  SEARCH_DEBOUNCE_DELAY: 300,
  FILTER_OPTIONS: [
    { key: 'todos', label: 'Todos' },
    { key: 'cuidador', label: 'Cuidadores' },
    { key: 'paseador', label: 'Paseadores' },
    { key: 'veterinario', label: 'Veterinarios' },
  ]
};

export class MisConexionesController {
  // Obtener datos iniciales
  static getInitialState() {
    return {
      searchQuery: '',
      selectedFilter: 'todos',
      showFilters: false,
      selectedProvider: null,
      showDetalles: false,
      showResenaModal: false,
      showRechazarModal: false,
      showMensajeFlotante: false,
      mensajeFlotante: { type: '', text: '' }
    };
  }

  // Proveedores de ejemplo. Implementar API. 
  static getMockProviders() {
    return [
      {
        id: '1',
        nombre: 'Juan Perez',
        rating: 5,
        descripcion: 'Cuidador profesional con 5 años de experiencia en cuidado de mascotas.',
        precio: '$30.000',
        ubicacion: 'Belgrano, CABA',
        disponibilidad: 'Lunes, Miércoles, Jueves',
        horario: 'A convenir',
        tipo: 'cuidador',
        estado: 'confirmado'
      },
      {
        id: '2',
        nombre: 'Carlos Gómez',
        rating: 5,
        descripcion: 'Paseador profesional con 5 años de experiencia en paseo de perros de todas las razas.',
        precio: '$25.000',
        ubicacion: 'Belgrano, CABA',
        disponibilidad: 'Lunes, Miércoles, Jueves',
        horario: 'A convenir',
        tipo: 'paseador',
        estado: 'pendiente'
      },
      {
        id: '3',
        nombre: 'Clínica Veterinaria San Antonio',
        rating: 5,
        descripcion: 'Clínica veterinaria especializada en medicina interna y cirugía de pequeños animales.',
        precio: '$35.000',
        ubicacion: 'Palermo, CABA',
        disponibilidad: 'Lunes a Viernes',
        horario: '9:00 - 18:00',
        tipo: 'veterinario',
        estado: 'finalizado'
      },
      {
        id: '4',
        nombre: 'Laura Fernández',
        rating: 3,
        descripcion: 'Paseadora con 2 años de experiencia. Especializada en perros pequeños y medianos.',
        precio: '$18.000',
        ubicacion: 'Palermo, CABA',
        disponibilidad: 'Martes, Jueves, Viernes',
        horario: '2-4 horas',
        tipo: 'paseador',
        estado: 'rechazado'
      },
    ];
  }

  // Remover tildes para búsqueda
  static normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Filtrar proveedores
  static filterProviders(providers, searchQuery, selectedFilter) {
    let filtered = providers;

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const normalizedQuery = this.normalizeText(searchQuery);
      filtered = filtered.filter(provider => 
        this.normalizeText(provider.nombre).includes(normalizedQuery) ||
        this.normalizeText(provider.ubicacion).includes(normalizedQuery) ||
        this.normalizeText(provider.descripcion).includes(normalizedQuery)
      );
    }

    // Filtrar por tipo de proveedor
    if (selectedFilter !== 'todos') {
      filtered = filtered.filter(provider => 
        provider.tipo === selectedFilter
      );
    }

    return filtered;
  }

  // Obtener tipo de proveedor
  static getProviderType(tipo) {
    switch(tipo) {
      case 'cuidador':
        return 'cuidador';
      case 'paseador':
        return 'paseador';
      case 'veterinario':
        return 'veterinario';
      default:
        return 'prestador de servicio';
    }
  }


  // Actualizar estado de proveedor
  static updateProviderState(providers, providerId, newState) {
    return providers.map(p => 
      p.id === providerId 
        ? { ...p, estado: newState }
        : p
    );
  }

  // Obtener mensajes
  static getActionMessages(action) {
    const messages = {
      rechazar: {
        type: 'success',
        text: 'Solicitud rechazada correctamente'
      },
      finalizar: {
        type: 'success',
        text: 'Servicio finalizado correctamente'
      }
    };
    return messages[action] || { type: '', text: '' };
  }

  // Obtener configuración de filtros
  static getFilterOptions() {
    return CONEXIONES_CONFIG.FILTER_OPTIONS;
  }

  // Obtener configuración de mensaje flotante
  static getMensajeFlotanteConfig() {
    return {
      duration: CONEXIONES_CONFIG.FLOATING_MESSAGE_DURATION
    };
  }
}
