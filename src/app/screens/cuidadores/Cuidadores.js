import React, { useState, useMemo } from 'react';
import { 
  ScrollView, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components';
import BarraBuscador from '../../components/BarraBuscador/BarraBuscador';
import Filtros from '../../components/Filtros/Filtros';
import BottomNavbar from '../../components/BottomNavbar/BottomNavbar';
import CuidadorCard from './components/CuidadorCard';
import { styles } from './Cuidadores.styles';

// Implementar la llamada a la API. Estos datos son de ejemplo.
const CUIDADORES_DATA = [
  {
    id: '1',
    nombre: 'Juan Perez',
    rating: 4,
    descripcion: 'Cuidadora profesional con 5 años de experiencia en cuidado de mascotas.',
    precio: '$25.000 - 30.000',
    ubicacion: 'Belgrano, CABA',
    disponibilidad: 'Lunes, Miércoles, Jueves',
    horario: 'A convenir',
  },
  {
    id: '2',
    nombre: 'Susana Jimenez',
    rating: 4,
    descripcion: 'Cuidadora con 1 año de experiencia en cuidado de mascotas.',
    precio: '$10.000 - 25.000',
    ubicacion: 'Colegiales, CABA',
    disponibilidad: 'Viernes, Sábado',
    horario: '5-8 horas',
  },
  {
    id: '3',
    nombre: 'Paula Benal',
    rating: 4,
    descripcion: 'Cuidadora profesional con 3 años de experiencia. Solo cuido gatos.',
    precio: '$25.000 - 40.000',
    ubicacion: 'Belgrano, CABA',
    disponibilidad: 'Lunes, Miércoles, Jueves',
    horario: 'A convenir',
  }
];

// Filtros
const FILTROS_DATA = [
  { key: 'todos', label: 'Todos' },
  { key: 'cercanos', label: 'Cercanos' },
  { key: 'mejor-valorados', label: 'Mejor valorados' },
];

const Cuidadores = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar cuidadores basado en búsqueda y filtro seleccionado
  const filteredCuidadores = useMemo(() => {
    let filtered = CUIDADORES_DATA;

    // Filtrar por texto de búsqueda
    if (searchText.trim()) {
      filtered = filtered.filter(cuidador =>
        cuidador.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        cuidador.ubicacion.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtrar por filtro seleccionado
    switch (selectedFilter) {
      case 'cercanos':
        // Implementar lógica de geolocalización
        break;
      case 'mejor-valorados':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Por defecto, ordenar de menor a mayor precio
        filtered = filtered.sort((a, b) => {
          const precioA = parseInt(a.precio.split(' - ')[0].replace(/[^0-9]/g, ''));
          const precioB = parseInt(b.precio.split(' - ')[0].replace(/[^0-9]/g, ''));
          return precioA - precioB;
        });
        break;
    }

    return filtered;
  }, [searchText, selectedFilter]);

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterKey) => {
    setSelectedFilter(filterKey);
  };

  const handleCuidadorPress = (cuidador) => {
    // Navegar a detalles del cuidador
    console.log('Ver detalles de:', cuidador.nombre);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <ScreenHeader
        title="Cuidadores"
        subtitle="Busca, elige y contacta a tu cuidador favorito"
        onBackPress={handleBackPress}
      />

      {/* Barra de búsqueda */}
      <BarraBuscador
        value={searchText}
        onChangeText={handleSearchChange}
        placeholder="Buscar cuidadores"
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

      {/* Lista de cuidadores */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.usersList}
      >
        {filteredCuidadores.map((cuidador) => (
          <CuidadorCard
            key={cuidador.id}
            cuidador={cuidador}
            onPress={() => handleCuidadorPress(cuidador)}
          />
        ))}
      </ScrollView>
      
      {/* Bottom Navbar */}
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default Cuidadores;