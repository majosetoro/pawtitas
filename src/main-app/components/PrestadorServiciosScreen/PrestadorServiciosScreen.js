import React, { useState, useMemo, useEffect } from 'react';
import { 
  ScrollView, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../ScreenHeader';
import BarraBuscador from '../BarraBuscador/BarraBuscador';
import Filtros from '../Filtros/Filtros';
import MenuInferior from '../MenuInferior/MenuInferior';
import PrestadorServiciosCard from '../PrestadorServiciosCard';
import PrestadorServiciosDetails from '../PrestadorServiciosDetails';
import Paginador from '../Paginador';
import { useLocation } from '../../contexts';
import { usePaginacion } from '../../hooks/usePaginacion';
import { styles } from './PrestadorServiciosScreen.styles';

const FILTROS_DATA = [
  { key: 'cercania', label: 'Más cercanos' },
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
  const { userLocation, getDistanceFromUser, isLocationEnabled } = useLocation();
  
  // Filtro por defecto: 'cercania' si hay ubicación activada, sino 'mejor-calificacion'
  const defaultFilter = isLocationEnabled && userLocation ? 'cercania' : 'mejor-calificacion';
  
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showDetalles, setShowDetalles] = useState(false);

  // Filtrar y ordenar proveedores basado en búsqueda y filtro seleccionado
   
  const filteredProviders = useMemo(() => {
    let filtered = providers;

    // Distancia a cada proveedor si tiene coordenadas y hay ubicación del usuario
    filtered = filtered.map(provider => {
      if (provider.latitude != null && provider.longitude != null && userLocation) {
        const distance = getDistanceFromUser(provider.latitude, provider.longitude);
        return { ...provider, distance };
      }
      return { ...provider, distance: null };
    });

    // Filtrar por texto de búsqueda
    if (searchText.trim()) {
      filtered = filtered.filter(provider =>
        provider.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        provider.ubicacion.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Ordenar según el filtro seleccionado
    switch (selectedFilter) {
      case 'cercania':
        filtered = filtered.sort((a, b) => {
          if (a.distance === null && b.distance === null) return 0;
          if (a.distance === null) return 1; // Los sin distancia van al final
          if (b.distance === null) return -1;
          return a.distance - b.distance; // Ordenar de menor a mayor distancia
        });
        break;
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
        break;
    }

    return filtered;
  }, [searchText, selectedFilter, providers, userLocation, getDistanceFromUser]);

  const {
    paginaActual,
    totalPaginas,
    itemsActuales,
    manejarCambioPagina,
    reiniciarPagina,
  } = usePaginacion(filteredProviders);

  useEffect(() => {
    reiniciarPagina();
  }, [searchText, selectedFilter]);

  // Cambiar a filtro de cercanía cuando se active la ubicación
  useEffect(() => {
    if (isLocationEnabled && userLocation && selectedFilter !== 'cercania') {
      setSelectedFilter('cercania');
    }
  }, [isLocationEnabled, userLocation]);

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
      >
        {itemsActuales.map((provider) => (
          <PrestadorServiciosCard
            key={provider.id}
            provider={provider}
            providerType={providerType}
            onPress={() => handleProviderPress(provider)}
          />
        ))}
        <Paginador
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambioPagina={manejarCambioPagina}
        />
      </ScrollView>
      
      {/* Bottom Navbar */}
      <MenuInferior />

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
