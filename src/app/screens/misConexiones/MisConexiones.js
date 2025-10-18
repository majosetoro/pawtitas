import React, { useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader, BottomNavbar, BarraBuscador, Filtros } from '../../components';
import PrestadorServiciosCard from '../../components/PrestadorServiciosCard';
import PrestadorServiciosDetails from '../../components/PrestadorServiciosDetails';
import { ESTADOS_CONEXION } from '../../constants/estadosConexion';
import { styles } from './MisConexiones.styles';

// Pantalla de Mis Conexiones
const MisConexiones = () => {
    const navigation = useNavigation();

    // Estados para filtros y búsqueda
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('todos');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [showDetalles, setShowDetalles] = useState(false);
    
    // Implementar la llamada a la API. Datos de ejemplo.
    const [providers, setProviders] = useState([
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
    ]);

    // Filtrar prestadores según búsqueda y filtro seleccionado
    const filteredProviders = useMemo(() => {
    let filtered = providers;

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.nombre.toLowerCase().includes(query) ||
        provider.ubicacion.toLowerCase().includes(query) ||
        provider.descripcion.toLowerCase().includes(query)
      );
    }

    // Filtrar por tipo de proveedor
    if (selectedFilter !== 'todos') {
      filtered = filtered.filter(provider => 
        provider.tipo === selectedFilter
      );
    }

    return filtered;
  }, [providers, searchQuery, selectedFilter]);

    // Manejar navegación hacia atrás
    const handleBackPress = () => {
        navigation.goBack();
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

    // Manejar clic en tarjeta de proveedor
    const handleProviderPress = (provider) => {
        setSelectedProvider(provider);
        setShowDetalles(true);
    };

    // Cerrar modal de detalles
    const handleCloseDetalles = () => {
        setShowDetalles(false);
        setSelectedProvider(null);
    };

    // Manejar navegación a reseñas
    const handleResenas = (provider) => {
        console.log('Ver reseñas de:', provider.nombre);
        handleCloseDetalles();
    };

    // Manejar desconexión o gestión de conexión
    const handleConectar = (provider) => {
        console.log('Gestionar conexión con:', provider.nombre);
        handleCloseDetalles();
    };

    // Manejar chat con prestador
    const handleChat = (provider) => {
        handleCloseDetalles();
        navigation.navigate('Chat', { providerId: provider.id });
    };

    // Manejar pago
    const handlePago = (provider) => {
        // Actualizar el estado a "confirmado" después del pago
        setProviders(prevProviders => 
            prevProviders.map(p => 
                p.id === provider.id 
                    ? { ...p, estado: ESTADOS_CONEXION.PAGO_CONFIRMADO }
                    : p
            )
        );
        
        handleCloseDetalles();
    };

    // Manejar finalización de servicio
    const handleFinalizarServicio = (provider) => {        
        // Actualizar el estado del servicio a 'finalizado'
        setProviders(prevProviders => 
            prevProviders.map(p => 
                p.id === provider.id 
                    ? { ...p, estado: ESTADOS_CONEXION.SERVICIO_FINALIZADO }
                    : p
            )
        );
        
        handleCloseDetalles();
    };

    // Obtener el tipo de proveedor basado en el tipo
    const getProviderType = (tipo) => {
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
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar prestadores de servicios"
          onFilterPress={() => setShowFilters(!showFilters)}
          filterIcon="menu-outline"
        />
  
        {/* Filtros */}
        <Filtros
          filters={[
            { key: 'todos', label: 'Todos' },
            { key: 'cuidador', label: 'Cuidadores' },
            { key: 'paseador', label: 'Paseadores' },
            { key: 'veterinario', label: 'Veterinarios' },
          ]}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          visible={showFilters}
        />
  
        {/* Lista de prestadores de servicios */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.usersList}
        >
          {filteredProviders.map((provider) => (
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
          visible={showDetalles}
          provider={selectedProvider}
          providerType={selectedProvider ? getProviderType(selectedProvider.tipo) : ''}
          onClose={handleCloseDetalles}
          onResenas={handleResenas}
          onConectar={handleConectar}
          misConexiones={true}
          onChat={handleChat}
          onPago={handlePago}
          onFinalizarServicio={handleFinalizarServicio}
        />

        {/* Navegación inferior */}
        <BottomNavbar />
      </SafeAreaView>
    );
}

export default MisConexiones;