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
import DetallesCuidadores from './DetallesCuidadores/DetallesCuidadores';
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
    email: 'juan.perez@gmail.com',
    telefono: '+54 9 11 12345678',
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
    email: 'susana.jimenez@gmail.com',
    telefono: '+54 9 11 87654321',
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
    email: 'paula.benal@gmail.com',
    telefono: '+54 9 11 11223344',
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
  const [selectedCuidador, setSelectedCuidador] = useState(null);
  const [showDetalles, setShowDetalles] = useState(false);

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
    setSelectedCuidador(cuidador);
    setShowDetalles(true);
  };

  const handleCloseDetalles = () => {
    setShowDetalles(false);
    setSelectedCuidador(null);
  };

  const handleResenas = (cuidador) => {
    // Navegar a pantalla de reseñas del cuidador
    console.log('Ver reseñas de:', cuidador.nombre);
    handleCloseDetalles();
  };

  const handleConectar = (cuidador) => {
    // Implementar lógica de conexión
    console.log('Conectar con:', cuidador.nombre);
    handleCloseDetalles();
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

      {/* Bottom Sheet de Detalles del Cuidador */}
      <DetallesCuidadores
        visible={showDetalles}
        cuidador={selectedCuidador}
        onClose={handleCloseDetalles}
        onResenas={handleResenas}
        onConectar={handleConectar}
      />
    </SafeAreaView>
  );
};

export default Cuidadores;