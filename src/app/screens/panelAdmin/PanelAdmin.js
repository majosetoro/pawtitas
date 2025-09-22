import React, { useState, useMemo } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader, BottomNavbar, BarraBuscador, Filtros } from '../../components';
import { UsuarioCard, EstadisticasCard } from './components';
import { styles } from './PanelAdmin.styles';

// Pantalla del Panel de Administrador
const PanelAdmin = () => {
  const navigation = useNavigation();
  
  // Estados para filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  
  // Implementar la llamada a la API. Estos datos son de ejemplo.
  const [users] = useState([
    {
      id: '1',
      nombre: 'Elisa Ying',
      email: 'elisa.ying@email.com',
      perfil: 'Cuidador',
      estado: 'Activado',
      fechaRegistro: '2025-06-17',
      descripcion: 'Cuidadora profesional con 5 años de experiencia en cuidado de mascotas.'
    },
    {
      id: '2',
      nombre: 'Pedro Gómez',
      email: 'pedro.gomez@email.com',
      perfil: 'Veterinario',
      estado: 'Pendiente',
      fechaRegistro: '2025-06-17',
      descripcion: 'Veterinario profesional con 10 años de experiencia en cuidado de mascotas.'
    },
    {
      id: '3',
      nombre: 'María Rodríguez',
      email: 'maria.rodriguez@email.com',
      perfil: 'Paseador',
      estado: 'Activado',
      fechaRegistro: '2025-06-15',
      descripcion: 'Paseador profesional con 5 años de experiencia en cuidado de mascotas.'
    }
  ]);

  // Calcular estadísticas
  const statistics = useMemo(() => {
    const activados = users.filter(user => user.estado === 'Activado').length;
    const pendientes = users.filter(user => user.estado === 'Pendiente').length;
    const desactivados = users.filter(user => user.estado === 'Desactivado').length;
    const total = users.length;

    return { activados, pendientes, desactivados, total };
  }, [users]);

  // Filtrar usuarios según búsqueda y filtro seleccionado
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.nombre.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.perfil.toLowerCase().includes(query)
      );
    }

    // Filtrar por estado
    if (selectedFilter !== 'todos') {
      filtered = filtered.filter(user => 
        user.estado.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    return filtered;
  }, [users, searchQuery, selectedFilter]);

  // Manejar navegación hacia atrás
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Manejar selección de usuario
  const handleUserPress = (user) => {
    // Navegar a detalles del usuario
    console.log('Ver detalles de:', user.nombre);
    // navigation.navigate('UserDetails', { userId: user.id });
  };

  // Manejar búsqueda
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Manejar filtro
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowFilters(false);
  };

  // Renderizar un ítem de usuario
  const renderUser = ({ item }) => (
    <UsuarioCard 
      user={item} 
      onPress={() => handleUserPress(item)}
      onStatusChange={() => console.log('Cambiar estado de:', item.nombre)}
    />
  );

  // Renderizar separador entre usuarios
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con ScreenHeader */}
      <ScreenHeader 
        title="Panel de Administrador"
        subtitle="Usuarios registrados en el sistema. Activa o desactiva según sea necesario."
        onBackPress={handleBackPress}
        showBackButton={true}
      />
      

      {/* Tarjeta de estadísticas */}
      <View style={styles.statsTabContainer}>
        <View style={styles.statsTab}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{statistics.activados}</Text>
            <Text style={styles.statLabel}>Activados</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{statistics.pendientes}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{statistics.desactivados}</Text>
            <Text style={styles.statLabel}>Desactivados</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{statistics.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      {/* Barra de búsqueda */}
      <BarraBuscador
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Buscar usuarios"
        onFilterPress={() => setShowFilters(!showFilters)}
        filterIcon="menu-outline"
      />

      {/* Filtros */}
      <Filtros
        filters={[
          { key: 'todos', label: 'Todos' },
          { key: 'activado', label: 'Activados' },
          { key: 'pendiente', label: 'Pendientes' },
          { key: 'desactivado', label: 'Desactivados' }
        ]}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        visible={showFilters}
      />

      {/* Lista de usuarios */}
      <View style={styles.content}>
        <FlatList
          data={filteredUsers}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.usersList}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
          bounces={true}
        />
      </View>
      
      {/* Navegación inferior */}
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default PanelAdmin;
