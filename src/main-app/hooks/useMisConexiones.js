import { useState, useMemo, useCallback } from 'react';
import { MisConexionesController } from '../controller';
import { ESTADOS_CONEXION } from '../constants/estadosConexion';
import { useLocation } from '../contexts';

export const useMisConexiones = () => {
  const { userLocation, getDistanceFromUser } = useLocation();
  
  // Estados
  const [state, setState] = useState(() => ({
    ...MisConexionesController.getInitialState(),
    showCalendarioModal: false,
    selectedDates: []
  }));
  const [providers, setProviders] = useState(() => MisConexionesController.getMockProviders());

  // Filtrar proveedores y agregar distancias
  const filteredProviders = useMemo(() => {
    const filtered = MisConexionesController.filterProviders(
      providers, 
      state.searchQuery, 
      state.selectedFilter
    );

    // Agregar distancia a cada proveedor si tiene coordenadas y hay ubicación del usuario
    return filtered.map(provider => {
      if (provider.latitude && provider.longitude && userLocation) {
        const distance = getDistanceFromUser(provider.latitude, provider.longitude);
        return { ...provider, distance };
      }
      return { ...provider, distance: null };
    });
  }, [providers, state.searchQuery, state.selectedFilter, userLocation, getDistanceFromUser]);

  // Búsqueda y filtros
  const handleSearch = useCallback((query) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setState(prev => ({ 
      ...prev, 
      selectedFilter: filter, 
      showFilters: false 
    }));
  }, []);

  const handleProviderPress = useCallback((provider) => {
    setState(prev => ({ 
      ...prev, 
      selectedProvider: provider, 
      showDetalles: true 
    }));
  }, []);

  const handleCloseDetalles = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showDetalles: false, 
      selectedProvider: null 
    }));
  }, []);

  const handlePago = useCallback((provider) => {
    // Abrir el modal de calendario para seleccionar fechas
    setState(prev => ({ 
      ...prev, 
      selectedProvider: provider,
      showCalendarioModal: true 
    }));
    handleCloseDetalles();
  }, [handleCloseDetalles]);

  const handleConfirmarPago = useCallback((selectedDates) => {
    if (!state.selectedProvider) return;
    
    // Actualizar el estado del proveedor a pago confirmado
    setProviders(prev => 
      MisConexionesController.updateProviderState(
        prev, 
        state.selectedProvider.id, 
        ESTADOS_CONEXION.PAGO_CONFIRMADO
      )
    );
    
    // Cerrar el modal y mostrar mensaje de éxito
    setState(prev => ({
      ...prev,
      showCalendarioModal: false,
      selectedDates: selectedDates,
      selectedProvider: null,
      showMensajeFlotante: true,
      mensajeFlotante: {
        type: 'success',
        text: `Pago confirmado para ${selectedDates.length} ${selectedDates.length === 1 ? 'día' : 'días'}`
      }
    }));
  }, [state.selectedProvider]);

  const handleCancelarCalendario = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showCalendarioModal: false,
      selectedProvider: null 
    }));
  }, []);

  const handleFinalizarServicio = useCallback((provider) => {
    setProviders(prev => 
      MisConexionesController.updateProviderState(
        prev, 
        provider.id, 
        ESTADOS_CONEXION.SERVICIO_FINALIZADO
      )
    );
    handleCloseDetalles();
  }, [handleCloseDetalles]);

  const handleRechazar = useCallback((provider) => {
    setState(prev => ({ 
      ...prev, 
      selectedProvider: provider, 
      showRechazarModal: true 
    }));
    handleCloseDetalles();
  }, [handleCloseDetalles]);

  const handleConfirmarRechazo = useCallback(() => {
    if (!state.selectedProvider) return;
    
    setProviders(prev => 
      MisConexionesController.updateProviderState(
        prev, 
        state.selectedProvider.id, 
        ESTADOS_CONEXION.SOLICITUD_RECHAZADA
      )
    );
    
    const message = MisConexionesController.getActionMessages('rechazar');
    setState(prev => ({
      ...prev,
      showRechazarModal: false,
      selectedProvider: null,
      showMensajeFlotante: true,
      mensajeFlotante: message
    }));
  }, [state.selectedProvider]);

  const handleCancelarRechazo = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showRechazarModal: false, 
      selectedProvider: null 
    }));
  }, []);

  const handleAgregarResena = useCallback((provider) => {
    setState(prev => ({ 
      ...prev, 
      selectedProvider: provider, 
      showResenaModal: true 
    }));
    handleCloseDetalles();
  }, [handleCloseDetalles]);

  const handleCloseResenaModal = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showResenaModal: false, 
      selectedProvider: null 
    }));
  }, []);

  const handleHideMensajeFlotante = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showMensajeFlotante: false, 
      mensajeFlotante: { type: '', text: '' } 
    }));
  }, []);

  const toggleFilters = useCallback(() => {
    setState(prev => ({ ...prev, showFilters: !prev.showFilters }));
  }, []);

  // Handlers para navegación
  const handleResenas = useCallback((provider) => {
    console.log('Ver reseñas de:', provider.nombre);
    handleCloseDetalles();
  }, [handleCloseDetalles]);

  const handleConectar = useCallback((provider) => {
    console.log('Gestionar conexión con:', provider.nombre);
    handleCloseDetalles();
  }, [handleCloseDetalles]);

  const handleChat = useCallback((provider, navigation) => {
    handleCloseDetalles();
    navigation.navigate('Chat', { providerId: provider.id });
  }, [handleCloseDetalles]);

  return {
    // Estados
    state,
    providers: filteredProviders,
    
    // Búsqueda y filtros
    handleSearch,
    handleFilterChange,
    handleProviderPress,
    handleCloseDetalles,
    handlePago,
    handleConfirmarPago,
    handleCancelarCalendario,
    handleFinalizarServicio,
    handleRechazar,
    handleConfirmarRechazo,
    handleCancelarRechazo,
    handleAgregarResena,
    handleCloseResenaModal,
    handleHideMensajeFlotante,
    toggleFilters,
    handleResenas,
    handleConectar,
    handleChat,
    
    // Tipo de proveedor y configuración de filtros
    getProviderType: MisConexionesController.getProviderType,
    filterOptions: MisConexionesController.getFilterOptions(),
    
    // Configuración de mensaje flotante
    mensajeFlotanteConfig: MisConexionesController.getMensajeFlotanteConfig()
  };
};