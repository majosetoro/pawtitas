import React, { useState, useMemo } from 'react';
import { 
  ScrollView, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components';
import BarraBuscador from '../../components/BarraBuscador/BarraBuscador';
import Filtros from '../../components/Filtros/Filtros';
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';
import PrestadorServiciosCard from '../PrestadorServiciosCard';
import PrestadorServiciosDetails from '../PrestadorServiciosDetails';
import { styles } from './PrestadorServiciosScreen.styles';

// Filtros
const FILTROS_DATA = [
  { key: 'todos', label: 'Todos' },
  { key: 'mejor-calificacion', label: 'Mejor calificación' },
  { key: 'mejor-precio', label: 'Mejor precio' },
];

const PrestadorServiciosScreen = ({ 
  navigation, 
  providers, 
  providerType, // cuidador, paseador o veterinario
  screenTitle,
  screenSubtitle
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showDetalles, setShowDetalles] = useState(false);

  // Filtrar proveedores basado en búsqueda y filtro seleccionado
  const filteredProviders = useMemo(() => {
    let filtered = providers;

    // Filtrar por texto de búsqueda
    if (searchText.trim()) {
      filtered = filtered.filter(provider =>
        provider.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        provider.ubicacion.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtrar por filtro seleccionado
    switch (selectedFilter) {
      case 'mejor-calificacion':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'mejor-precio':
        filtered = filtered.sort((a, b) => {
          const precioA = parseInt(a.precio.replace(/[^0-9]/g, ''));
          const precioB = parseInt(b.precio.replace(/[^0-9]/g, ''));
          return precioA - precioB;
        });
        break;
      default:
        // Por defecto, ordenar por cercanía
        // Implementar lógica de geolocalización
        break;
    }

    return filtered;
  }, [searchText, selectedFilter, providers]);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterKey) => {
    setSelectedFilter(filterKey);
  };

  const handleProviderPress = (provider) => {
    setSelectedProvider(provider);
    setShowDetalles(true);
  };

  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setSelectedProvider(null);
  };

  const handleResenas = (provider) => {
    // Navegar a pantalla de reseñas del prestador
    console.log('Ver reseñas de:', provider.nombre);
    handleCloseDetalles();
  };

  const handleConectar = (provider) => {
    // Implementar lógica de conexión
    console.log('Conectar con:', provider.nombre);
    handleCloseDetalles();
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <ScreenHeader
        title={screenTitle}
        subtitle={screenSubtitle}
        onBackPress={handleBackPress}
      />

      {/* Barra de búsqueda */}
      <BarraBuscador
        value={searchText}
        onChangeText={handleSearchChange}
        placeholder={`Buscar ${providerType}`}
        onFilterPress={handleFilterPress}
        filterIcon="menu-outline"
      />

      {/* Filtros */}
      <Filtros
        filters={FILTROS_DATA}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        visible={showFilters}
      />

      {/* Lista de prestadores */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.usersList}
      >
        {filteredProviders.map((provider) => (
          <PrestadorServiciosCard
            key={provider.id}
            provider={provider}
            providerType={providerType}
            onPress={() => handleProviderPress(provider)}
          />
        ))}
      </ScrollView>
      
      {/* Bottom Navbar */}
      <BottomNavbar />

      {/* Bottom Sheet de Detalles del Prestador */}
      <PrestadorServiciosDetails
        visible={showDetalles}
        provider={selectedProvider}
        providerType={providerType}
        onClose={handleCloseDetalles}
        onResenas={handleResenas}
        onConectar={handleConectar}
      />
    </SafeAreaView>
  );
};

export default PrestadorServiciosScreen;
