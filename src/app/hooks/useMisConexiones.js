import { useState, useMemo, useCallback } from 'react';
import { MisConexionesController } from '../controller/MisConexionesController';
import { ESTADOS_CONEXION } from '../constants/estadosConexion';

export const useMisConexiones = () => {
  // Estados
  const [state, setState] = useState(() => MisConexionesController.getInitialState());
  const [providers, setProviders] = useState(() => MisConexionesController.getMockProviders());

  // Filtrar proveedores
  const filteredProviders = useMemo(() => {
    return MisConexionesController.filterProviders(
      providers, 
      state.searchQuery, 
      state.selectedFilter
    );
  }, [providers, state.searchQuery, state.selectedFilter]);

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
    setProviders(prev => 
      MisConexionesController.updateProviderState(
        prev, 
        provider.id, 
        ESTADOS_CONEXION.PAGO_CONFIRMADO
      )
    );
    handleCloseDetalles();
  }, [handleCloseDetalles]);

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
      showFloatingMessage: true,
      floatingMessage: message
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

  const handleHideFloatingMessage = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      showFloatingMessage: false, 
      floatingMessage: { type: '', text: '' } 
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
    handleFinalizarServicio,
    handleRechazar,
    handleConfirmarRechazo,
    handleCancelarRechazo,
    handleAgregarResena,
    handleCloseResenaModal,
    handleHideFloatingMessage,
    toggleFilters,
    handleResenas,
    handleConectar,
    handleChat,
    
    // Tipo de proveedor y configuración de filtros
    getProviderType: MisConexionesController.getProviderType,
    filterOptions: MisConexionesController.getFilterOptions(),
    
    // Configuración de mensaje flotante
    floatingMessageConfig: MisConexionesController.getFloatingMessageConfig()
  };
};