import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ValidarUsuario.styles';
import { colors } from '../../../../shared/styles';
import { ESTADOS_USUARIO, ESTADOS_USUARIO_CONFIG } from '../../../constants/estadosUsuario';
import GuardarCancelarBtn from '../../../components/buttons/GuardarCancelarBtn';

const ValidarUsuario = ({ 
  isVisible, 
  onClose, 
  usuario, 
  onActivate, 
  onDeactivate 
}) => {
  // Si no hay usuario, no renderizamos
  if (!usuario) return null;

  // Función para determinar el estilo del estado
  const getStatusStyle = (estado) => {
    if (!estado) return {
      badge: styles.statusBadge,
      text: styles.statusText
    };
    
    switch (estado) {
      case ESTADOS_USUARIO.ACTIVADO:
        return {
          badge: styles.activeStatus,
          text: styles.activeStatusText
        };
      case ESTADOS_USUARIO.PENDIENTE:
        return {
          badge: styles.pendingStatus,
          text: styles.pendingStatusText
        };
      case ESTADOS_USUARIO.DESACTIVADO:
        return {
          badge: styles.inactiveStatus,
          text: styles.inactiveStatusText
        };
      default:
        return {
          badge: styles.statusBadge,
          text: styles.statusText
        };
    }
  };

  // Obtener el label del estado
  const getStatusLabel = (estado) => {
    return ESTADOS_USUARIO_CONFIG[estado]?.label || estado;
  };

  // Formatear fecha
  const formatDate = (fecha) => {
    if (!fecha) return 'No disponible';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Obtener los estilos de estado
  const statusStyle = getStatusStyle(usuario.estado);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      style={styles.modalContainer}
      propagateSwipe={true}
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop={true}
    >
      <View style={styles.contentContainer}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <Text style={styles.title}>Detalles del Usuario</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          scrollEventThrottle={16}
        >

          {/* Implementar la llamada a la API para obtener la información del usuario*/}
          {/* Información básica */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nombre y Apellido:</Text>
              <Text style={styles.value}>{usuario.nombreApellido || usuario.nombre || 'No disponible'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{usuario.email || 'No disponible'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.value}>{usuario.telefono || 'No disponible'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ubicación:</Text>
              <Text style={styles.value}>{usuario.ubicacion || 'No disponible'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Perfil:</Text>
              <Text style={styles.value}>{usuario.perfil || 'No disponible'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Estado:</Text>
              <View style={[styles.statusBadge, statusStyle?.badge]}>
                <Text style={[styles.statusText, statusStyle?.text]}>
                  {getStatusLabel(usuario.estado) || 'No disponible'}
                </Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Registro:</Text>
              <Text style={styles.value}>{formatDate(usuario.fechaRegistro)}</Text>
            </View>
          </View>

          {/* Descripción */}
          {usuario.descripcion && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.value}>{usuario.descripcion}</Text>
            </View>
          )}

          {/* Documentación */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Documentación</Text>
            
            {/* Aquí se mostrarán los documentos del usuario mediante una API o storage*/}
            <View style={styles.documentSection}>
              <View style={styles.documentItem}>
                <Ionicons 
                  name="document-text-outline" 
                  size={24} 
                  color={colors.primary} 
                  style={styles.documentIcon} 
                />
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>Identificación.pdf</Text>
                </View>
              </View>
              
              <View style={styles.documentItem}>
                <Ionicons 
                  name="document-text-outline" 
                  size={24} 
                  color={colors.primary} 
                  style={styles.documentIcon} 
                />
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName}>Certificación.pdf</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Botones de acción */}
          <View style={styles.buttonContainer}>            
            {usuario.estado !== ESTADOS_USUARIO.DESACTIVADO && (
              <GuardarCancelarBtn 
                label="Desactivar"
                onPress={onDeactivate}
                variant="secondary"
              />
            )}
            {usuario.estado !== ESTADOS_USUARIO.ACTIVADO && (
              <GuardarCancelarBtn 
                label="Activar"
                onPress={onActivate}
                variant="primary"
              />
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ValidarUsuario;