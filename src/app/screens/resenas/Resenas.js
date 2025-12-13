import React, { useState, useMemo } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenHeader, MenuInferior, BarraBuscador, Filtros } from '../../components';
import ResenaCard from '../../components/ResenaCard';
import { styles } from './Resenas.styles';

// Pantalla de Mis Reseñas
const Resenas = () => {
    const navigation = useNavigation();

    // Estados para filtros y búsqueda
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('todos');
    const [showFilters, setShowFilters] = useState(false);
    
    // Implementar la llamada a la API. Estos datos son de ejemplo.
    const [resenas, setResenas] = useState([
        {
            id: '1',
            usuario: {
                nombre: 'María González',
                avatar: null
            },
            rating: 4.5,
            texto: 'Excelente servicio de cuidado. María fue muy profesional con mi perro Max, lo cuidó como si fuera suyo. Muy recomendada.',
            fecha: '2024-01-15',
            tipo: 'cuidador'
        },
        {
            id: '2',
            usuario: {
                nombre: 'Carlos Gómez',
                avatar: null
            },
            rating: 3.5,
            texto: 'Buen servicio de paseo. Carlos fue puntual y responsable, aunque podría mejorar en la comunicación durante el paseo.',
            fecha: '2024-01-10',
            tipo: 'paseador'
        },
        {
            id: '3',
            usuario: {
                nombre: 'Dr. Martínez',
                avatar: null
            },
            rating: 5.0,
            texto: 'Increíble atención veterinaria. El doctor fue muy profesional, explicó todo detalladamente y mi gato se recuperó perfectamente.',
            fecha: '2024-01-08',
            tipo: 'veterinario'
        },
        {
            id: '4',
            usuario: {
                nombre: 'Laura Fernández',
                avatar: null
            },
            rating: 4.0,
            texto: 'Muy buena cuidadora. Laura fue muy cariñosa con mis mascotas y me envió fotos durante todo el día. Servicio confiable.',
            fecha: '2024-01-05',
            tipo: 'cuidador'
        },
        {
            id: '5',
            usuario: {
                nombre: 'Roberto Silva',
                avatar: null
            },
            rating: 4.5,
            texto: 'Excelente paseador. Roberto fue muy atento con mi perro, me mantuvo informado durante todo el paseo. Definitivamente lo volveré a contratar.',
            fecha: '2024-01-03',
            tipo: 'paseador'
        },
    ]);

    const filteredResenas = useMemo(() => {
    let filtered = resenas;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resena => 
        resena.usuario.nombre.toLowerCase().includes(query) ||
        resena.texto.toLowerCase().includes(query)
      );
    }

    if (selectedFilter !== 'todos') {
      if (selectedFilter === 'mejor-calificacion') {
        filtered = filtered.sort((a, b) => b.rating - a.rating);
      } else {
        filtered = filtered.filter(resena => {
          const texto = resena.texto.toLowerCase();
          switch(selectedFilter) {
            case 'cuidador':
              return texto.includes('cuidador') || texto.includes('cuidado');
            case 'paseador':
              return texto.includes('paseador') || texto.includes('paseo');
            case 'veterinario':
              return texto.includes('veterinario') || texto.includes('doctor') || texto.includes('clínica');
            default:
              return true;
          }
        });
      }
    }

    return filtered;
  }, [resenas, searchQuery, selectedFilter]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setShowFilters(false);
  };


    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <ScreenHeader 
          title="Mis Reseñas"
          subtitle="Revisa las reseñas que compartiste en tu experiencia"
          onBackPress={handleBackPress}
          showBackButton={true}
        />
        
        <BarraBuscador
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar por usuario o comentario"
          onFilterPress={() => setShowFilters(!showFilters)}
          filterIcon="menu-outline"
        />
  
        <Filtros
          filters={[
            { key: 'todos', label: 'Todos' },
            { key: 'mejor-calificacion', label: 'Mejor calificación' },
            { key: 'cuidador', label: 'Cuidadores' },
            { key: 'paseador', label: 'Paseadores' },
            { key: 'veterinario', label: 'Veterinarios' },
          ]}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
          visible={showFilters}
        />
  
        {/* Lista de reseñas */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.usersList}
        >
          {filteredResenas.length > 0 ? (
            filteredResenas.map((resena) => (
              <ResenaCard
                key={resena.id}
                resena={resena}
              />  
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {resenas.length === 0 
                  ? "Todavía no dejaste reseñas. Cuando completes tus servicios, podrás verlas acá."
                  : "No se encontraron reseñas con los filtros seleccionados."}
              </Text>
            </View>
          )}
        </ScrollView>

        <MenuInferior />
      </SafeAreaView>
    );
}

export default Resenas;