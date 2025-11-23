import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../../components/ScreenHeader';
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';
import BarraBuscador from '../../components/BarraBuscador/BarraBuscador';
import Filtros from '../../components/Filtros/Filtros';
import ResenaFormModal from '../../components/ResenaFormModal/ResenaFormModal';
import PrestadorServiciosCard from '../../components/PrestadorServiciosCard/PrestadorServiciosCard';
import PrestadorServiciosDetails from '../../components/PrestadorServiciosDetails/PrestadorServiciosDetails';
import ConfirmacionDialogo from '../../components/ConfirmacionDialogo';
import CalendarioPagoModal from '../../components/CalendarioPagoModal';
import { FloatingMessage } from '../../components';
import { useMisConexiones } from '../../hooks/useMisConexiones';
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
    handleHideFloatingMessage,
    toggleFilters,
    handleResenas,
    handleConectar,
    handleChat,
    getProviderType,
    filterOptions,
    floatingMessageConfig
  } = useMisConexiones();

  // Navegación
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleChatWithNavigation = (provider) => {
    handleChat(provider, navigation);
  };

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
        {providers.map((provider) => (
          <PrestadorServiciosCard
            key={provider.id}
            provider={provider}
            providerType={getProviderType(provider.tipo)}
            onPress={() => handleProviderPress(provider)}
            misConexiones={true}
          />
        ))}
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
      <FloatingMessage
        visible={state.showFloatingMessage}
        message={state.floatingMessage.text}
        type={state.floatingMessage.type}
        onHide={handleHideFloatingMessage}
        duration={floatingMessageConfig.duration}
      />

      {/* Navegación inferior */}
      <BottomNavbar />
    </SafeAreaView>
  );
}

export default MisConexiones;