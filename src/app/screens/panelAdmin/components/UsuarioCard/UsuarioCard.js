import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../../shared/styles';
import { ESTADOS_USUARIO, ESTADOS_USUARIO_CONFIG } from '../../../../constants/estadosUsuario';
import { styles } from './UsuarioCard.styles';

// Componente para mostrar una tarjeta de usuario individual en el panel de administrador
const UsuarioCard = ({ user, onPress, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const { 
    id,
    nombre, 
    email,
    perfil,
    estado,
    fechaRegistro,
    descripcion
  } = user;
  
  // Manejar la apertura/cierre del menú
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // Manejar la selección de ver detalles
  const handleViewDetails = () => {
    setShowMenu(false);
    onPress();
  };

  // Manejar el cambio de estado del usuario
  const handleStatusChange = () => {
    setShowMenu(false);
    onStatusChange();
  };

  // Cerrar menú cuando se toque fuera
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  // Obtener el color del estado
  const getStatusColor = (estado) => {
    switch (estado) {
      case ESTADOS_USUARIO.ACTIVADO:
        return colors.success;
      case ESTADOS_USUARIO.PENDIENTE:
        return colors.warning;
      case ESTADOS_USUARIO.DESACTIVADO:
        return colors.error;
      default:
        return colors.text.secondary;
    }
  };

  // Obtener el label del estado
  const getStatusLabel = (estado) => {
    return ESTADOS_USUARIO_CONFIG[estado]?.label || estado;
  };

  // Formatear fecha de registro
  const formatDate = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return (
    <View style={styles.container}>
      {showMenu && (
        <TouchableWithoutFeedback onPress={handleCloseMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      <TouchableOpacity 
        style={styles.content}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={styles.userInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.nombre}>{nombre}</Text>
                <Text style={styles.descripcion} numberOfLines={3}>
                  {descripcion}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity 
              style={styles.arrowButton}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.footerRow}>
            <View style={styles.perfilContainer}>
              <Text style={styles.perfilText}>
                {perfil}
              </Text>
            </View>
            
            <View style={styles.statusContainer}>
              <Text style={[styles.statusText,{ color: getStatusColor(estado) }]}>
                {getStatusLabel(estado)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.dateText}>
            Registrado el {formatDate(fechaRegistro)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


export default UsuarioCard;
