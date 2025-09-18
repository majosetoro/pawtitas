import React, { useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './misMascotas.styles';
import { ScreenHeader, BottomNavbar, FloatingAddBtn } from '../../components';
import { MascotaCard, EmptyMascotasList } from './components';

// Pantalla de Mis Mascotas. Muestra la lista de mascotas registradas del cliente
const MisMascotas = () => {
  const navigation = useNavigation();
  
  // Estado para almacenar las mascotas
  // Implementar la llamada a la API. Estos datos son de ejemplo.
  const [mascotas, setMascotas] = useState([
    {
      id: '1',
      nombre: 'Luna',
      tipo: 'Gato Siamés',
      edad: 2,
      descripcion: 'Luna es muy cariñosa e inteligente. Le encanta jugar y cazar. Tiene que tomar el medicamento 2 veces al día.',
      condicionEspecial: 'Enfermedad. Cuidado especial'
    }
  ]);

  // Maneja la navegación hacia atrás
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Manejar el tap en una mascota para editarla
  const handleMascotaPress = (mascota) => {
    // Formulario de edición
    //navigation.navigate('EditarMascota', { mascota });
    Alert.alert(
      'El formulario de edición estará disponible próximamente.'
    );
  };

  // Manejar la acción de añadir una nueva mascota
  const handleAddMascota = () => {
    // Formulario de alta
    //navigation.navigate('CrearMascota');
    Alert.alert(
      'El formulario de alta estará disponible próximamente.'
    );
  };

  // Renderizar un ítem de la lista de mascotas
  const renderMascota = ({ item }) => (
    <MascotaCard 
      mascota={item} 
      onPress={() => handleMascotaPress(item)} 
    />
  );

  // Renderizar el separador entre mascotas
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con título y botón de regreso */}
      <ScreenHeader 
        title="Mis Mascotas"
        subtitle="Visualiza y gestiona tus mascotas registradas"
        onBackPress={handleBackPress}
        showBackButton={true}
      />
      
      {/* Contenido principal */}
      <View style={styles.content}>
        {mascotas.length > 0 ? (
          <FlatList
            data={mascotas}
            renderItem={renderMascota}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.mascotasList}
            ItemSeparatorComponent={renderSeparator}
            showsVerticalScrollIndicator={false}
            bounces={true}
          />
        ) : (
          <EmptyMascotasList />
        )}
      </View>
      
      {/* Botón flotante para agregar mascotas*/}
      <FloatingAddBtn 
        onPress={handleAddMascota} 
        accessibilityLabel="Añadir mascota"
      />
      
      {/* Navegación inferior */}
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default MisMascotas;