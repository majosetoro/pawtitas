import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import MenuInferior from '../../components/MenuInferior/MenuInferior';
import BarraBuscador from '../../components/BarraBuscador/BarraBuscador';
import Filtros from '../../components/Filtros/Filtros';
import ResenaFormModal from '../../components/ResenaFormModal/ResenaFormModal';
import PrestadorServiciosCard from '../../components/PrestadorServiciosCard/PrestadorServiciosCard';
import PrestadorServiciosDetails from '../../components/PrestadorServiciosDetails/PrestadorServiciosDetails';
import ConfirmacionDialogo from '../../components/ConfirmacionDialogo';
import CalendarioPagoModal from '../../components/CalendarioPagoModal';
import Paginador from '../../components/Paginador';
import { MensajeFlotante } from '../../components';
import { useMisConexiones } from '../../hooks/useMisConexiones';
import { usePaginacion } from '../../hooks/usePaginacion';
import { styles } from './MisConexiones.styles';

// Pantalla de Mis Conexiones
const MisConexiones = () => {
  const navigation = useNavigation();
  const {
    state,
    providers,
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
    getProviderType,
    filterOptions,
    mensajeFlotanteConfig
  } = useMisConexiones();

  // Navegación
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChatWithNavigation = (provider) => {
    handleChat(provider, navigation);
  };

  const {
    paginaActual,
    totalPaginas,
    itemsActuales: providersActuales,
    manejarCambioPagina,
    reiniciarPagina,
  } = usePaginacion(providers);

  useEffect(() => {
    reiniciarPagina();
  }, [state.searchQuery, state.selectedFilter]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScreenHeader 
        title="Mis Conexiones"
        subtitle="Visualiza, gestiona y paga tus servicios de cuidado, paseo y salud de tu mascota"
        onBackPress={handleBackPress}
        showBackButton={true}
      />
      
      {/* Barra de búsqueda */}
      <BarraBuscador
        value={state.searchQuery}
        onChangeText={handleSearch}
        placeholder="Buscar prestadores de servicios"
        onFilterPress={toggleFilters}
        filterIcon="menu-outline"
      />

      {/* Filtros */}
      <Filtros
        filters={filterOptions}
        selectedFilter={state.selectedFilter}
        onFilterChange={handleFilterChange}
        visible={state.showFilters}
      />

      {/* Lista de prestadores de servicios */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.usersList}
      >
        {providersActuales.map((provider) => (
          <PrestadorServiciosCard
            key={provider.id}
            provider={provider}
            providerType={getProviderType(provider.tipo)}
            onPress={() => handleProviderPress(provider)}
            misConexiones={true}
          />
        ))}
        <Paginador
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambioPagina={manejarCambioPagina}
        />
      </ScrollView>
      
      {/* Detalles del prestador */}
      <PrestadorServiciosDetails
        visible={state.showDetalles}
        provider={state.selectedProvider}
        providerType={state.selectedProvider ? getProviderType(state.selectedProvider.tipo) : ''}
        onClose={handleCloseDetalles}
        onResenas={handleResenas}
        onConectar={handleConectar}
        misConexiones={true}
        onChat={handleChatWithNavigation}
        onPago={handlePago}
        onFinalizarServicio={handleFinalizarServicio}
        onAgregarResena={handleAgregarResena}
        onRechazar={handleRechazar}
      />

      <ResenaFormModal
        visible={state.showResenaModal}
        usuario={state.selectedProvider}
        tipoUsuario="prestador"
        onClose={handleCloseResenaModal}
      />

      {/* Modal de Calendario para Pago */}
      <CalendarioPagoModal
        visible={state.showCalendarioModal}
        providerName={state.selectedProvider?.nombre}
        onClose={handleCancelarCalendario}
        onConfirm={handleConfirmarPago}
      />

      {/* Confirmación para rechazar */}
      <ConfirmacionDialogo
        visible={state.showRechazarModal}
        title="Rechazar solicitud"
        message="¿Estás seguro de que quieres rechazar esta solicitud? Esta acción no se puede deshacer."
        onConfirm={handleConfirmarRechazo}
        onCancel={handleCancelarRechazo}
        confirmText="Rechazar"
        cancelText="Cancelar"
        type="danger"
      />

      {/* Mensaje flotante */}
      <MensajeFlotante
        visible={state.showMensajeFlotante}
        message={state.mensajeFlotante.text}
        type={state.mensajeFlotante.type}
        onHide={handleHideMensajeFlotante}
        duration={mensajeFlotanteConfig.duration}
      />

      {/* Navegación inferior */}
      <MenuInferior />
    </SafeAreaView>
  );
}

export default MisConexiones;