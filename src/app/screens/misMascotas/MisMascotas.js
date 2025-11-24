import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './misMascotas.styles';
import { ScreenHeader, BottomNavbar, FloatingAddBtn, MensajeFlotante, ConfirmacionDialogo as ConfirmacionDialogo } from '../../components';
import { MascotaCard, EmptyMascotasList, MascotaFormModal } from './components';

// Pantalla de Mis Mascotas. Muestra la lista de mascotas registradas del cliente
const MisMascotas = () => {
  const navigation = useNavigation();
  
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estado para almacenar la mascota que se está editando (null si es creación)
  const [editingMascota, setEditingMascota] = useState(null);
  
  // Estado para mensajes flotantes
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showMensajeFlotante, setShowMensajeFlotante] = useState(false);
  
  // Estado para el diálogo de confirmación de eliminación
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [mascotaToDelete, setMascotaToDelete] = useState(null);
  
  // Estado para almacenar las mascotas
  // Implementar la llamada a la API. Estos datos son de ejemplo.
  const [mascotas, setMascotas] = useState([
    {
      id: '1',
      nombre: 'Luna',
      especie: 'Gato',
      raza: 'Siamés',
      edad: 2,
      edadUnidad: 'años',
      infoAdicional: 'Luna es muy cariñosa e inteligente. Le encanta jugar y cazar.',
      infoMedica: 'Tiene que tomar el medicamento 2 veces al día.',
      tieneEnfermedad: true,
      tomaMedicamentos: false,
      requiereCuidadoEspecial: true,
      condicionEspecial: 'Enfermedad. Cuidado especial'
    }
  ]);

  // Maneja la navegación hacia atrás
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Manejar el tap en una mascota para editarla
  const handleMascotaPress = (mascota) => {
    // Configurar el modo de edición
    setEditingMascota(mascota);
    // Mostrar el modal
    setModalVisible(true);
  };

  // Manejar la acción de añadir una nueva mascota
  const handleAddMascota = () => {
    // Configurar modo de creación (sin mascota para editar)
    setEditingMascota(null);
    // Mostrar el modal
    setModalVisible(true);
  };
  
  // Cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingMascota(null);
  };
  
  // Guardar los datos de la mascota (creación o edición)
  const handleSaveMascota = (formData) => {
    const edad = formData.edad ? parseInt(formData.edad, 10) : 0;
    
    // Datos procesados para guardar
    const processedData = {
      ...formData,
      edad,
      edadUnidad: formData.edadUnidad || 'años',
      // Generar condicionEspecial basado en el estado de los checkboxes
      condicionEspecial: generateCondicionEspecial(formData),
      avatarUri: formData.avatarUri || null
    };
    
    if (editingMascota) {
      // Modo edición: actualizar mascota existente
      const updatedMascotas = mascotas.map(item => 
        item.id === editingMascota.id 
          ? { 
              ...item, 
              ...processedData
            } 
          : item
      );
      setMascotas(updatedMascotas);
      
      // Mostrar mensaje de éxito para edición
      setMessage({ 
        type: "success", 
        text: `¡${formData.nombre} ha sido actualizado correctamente!` 
      });
    } else {
      // Modo creación: añadir nueva mascota
      const newMascota = {
        id: String(Date.now()),
        ...processedData
      };
      setMascotas([...mascotas, newMascota]);
      
      // Mostrar mensaje de éxito para creación
      setMessage({ 
        type: "success", 
        text: `¡${formData.nombre} ha sido agregado correctamente!` 
      });
    }
    
    // Mostrar el mensaje flotante
    setShowMensajeFlotante(true);
    
    // Cerrar el modal
    handleCloseModal();
  };
  
  // Función auxiliar para generar el texto de condición especial
  const generateCondicionEspecial = (formData) => {
    const conditions = [];
    if (formData.tieneEnfermedad) conditions.push('Enfermedad');
    if (formData.tomaMedicamentos) conditions.push('Medicamentos');
    if (formData.requiereCuidadoEspecial) conditions.push('Cuidado especial');
    
    return conditions.length > 0 ? conditions.join('. ') : null;
  };

  // Manejar el ocultamiento del mensaje flotante
  const handleHideMensajeFlotante = () => {
    setShowMensajeFlotante(false);
    setMessage({ type: "", text: "" });
  };

  // Manejar el intento de eliminar una mascota
  const handleDeleteMascota = (mascota) => {
    setMascotaToDelete(mascota);
    setShowDeleteConfirmation(true);
  };

  // Confirmar eliminación de mascota
  const confirmDeleteMascota = () => {
    if (mascotaToDelete) {
      // Eliminar la mascota de la lista
      const updatedMascotas = mascotas.filter(item => item.id !== mascotaToDelete.id);
      setMascotas(updatedMascotas);
      
      // Mostrar mensaje de éxito
      setMessage({ 
        type: "success", 
        text: `¡${mascotaToDelete.nombre} ha sido eliminado correctamente!` 
      });
      setShowMensajeFlotante(true);
    }
    
    // Cerrar el diálogo de confirmación
    setShowDeleteConfirmation(false);
    setMascotaToDelete(null);
  };

  // Cancelar eliminación de mascota
  const cancelDeleteMascota = () => {
    setShowDeleteConfirmation(false);
    setMascotaToDelete(null);
  };

  // Renderizar un ítem de la lista de mascotas
  const renderMascota = ({ item }) => (
    <MascotaCard 
      mascota={item} 
      onPress={() => handleMascotaPress(item)}
      onDelete={() => handleDeleteMascota(item)}
    />
  );

  // Separador entre mascotas
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      {/* Mensaje flotante */}
      <MensajeFlotante
        message={message.text}
        type={message.type}
        visible={showMensajeFlotante}
        onHide={handleHideMensajeFlotante}
        duration={4000}
      />
      
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
      
      {/* Modal de formulario para crear/editar mascotas */}
      <MascotaFormModal
        visible={modalVisible}
        onClose={handleCloseModal}
        mascotaData={editingMascota}
        onSave={handleSaveMascota}
      />
      
      {/* Botón flotante para agregar mascotas*/}
      <FloatingAddBtn 
        onPress={handleAddMascota} 
        accessibilityLabel="Añadir mascota"
      />
      
      {/* Navegación inferior */}
      <BottomNavbar />
      
      {/* Diálogo de confirmación para eliminar mascota */}
      <ConfirmacionDialogo
        visible={showDeleteConfirmation}
        title="Eliminar mascota"
        message={`¿Estás seguro de que quieres eliminar a ${mascotaToDelete?.nombre}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={confirmDeleteMascota}
        onCancel={cancelDeleteMascota}
        type="danger"
        usePortal={false}
      />
    </SafeAreaView>
  );
};

export default MisMascotas;