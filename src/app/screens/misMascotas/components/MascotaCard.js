import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../../../shared/styles';

// Componente para mostrar una tarjeta de mascota individual
const MascotaCard = ({ mascota, onPress, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const { 
    nombre, 
    especie, 
    raza, 
    edad, 
    edadUnidad = 'años',
    infoAdicional, 
    condicionEspecial 
  } = mascota;
  
  // Formateamos el tipo combinando especie y raza
  const tipo = `${especie}${raza ? ' ' + raza : ''}`;
  
  // Formateamos la edad con su unidad
  const formatearEdad = (edad, unidad) => {
    if (unidad === 'meses') {
      return edad === 1 ? `${edad} mes` : `${edad} meses`;
    } else {
      return edad === 1 ? `${edad} año` : `${edad} años`;
    }
  };

  // Manejar la apertura/cierre del menú
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // Manejar la selección de editar
  const handleEdit = () => {
    setShowMenu(false);
    onPress();
  };

  // Manejar la selección de eliminar
  const handleDelete = () => {
    setShowMenu(false);
    onDelete();
  };

  // Cerrar menú cuando se toque fuera
  const handleCloseMenu = () => {
    setShowMenu(false);
  };
  
  return (
    <View style={styles.container}>
      {showMenu && (
        <TouchableWithoutFeedback onPress={handleCloseMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.nombre}>{nombre}</Text>
            <View style={styles.menuContainer}>
              <TouchableOpacity 
                style={styles.menuButton}
                onPress={handleMenuToggle}
                activeOpacity={0.7}
              >
                <Ionicons name="ellipsis-horizontal" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
              
              {showMenu && (
                <View style={styles.menuDropdown}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={handleEdit}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="pencil-outline" size={16} color={colors.text.secondary} />
                    <Text style={styles.menuItemText}>Editar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={handleDelete}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={16} color={colors.error} />
                    <Text style={[styles.menuItemText, styles.deleteMenuItemText]}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          
          <Text style={styles.tipoEdad}>
            {tipo}, {formatearEdad(edad, edadUnidad)}
          </Text>
          
          <Text style={styles.descripcion} numberOfLines={5}>
            {infoAdicional}
          </Text>
          
          {condicionEspecial && (
            <View style={styles.condicionContainer}>
              <Ionicons name="alert-circle-outline" size={14} color={colors.warning} />
              <Text style={styles.condicionText}>{condicionEspecial}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 999,
  },
  content: {
    padding: 16,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nombre: {
    ...typography.styles.h3,
    color: colors.text.primary,
    flex: 1,
  },
  menuContainer: {
    position: 'relative',
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuDropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    ...typography.styles.body,
    color: colors.text.primary,
    marginLeft: 12,
    fontWeight: '500',
  },
  deleteMenuItemText: {
    color: colors.error,
  },
  tipoEdad: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  descripcion: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  condicionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  condicionText: {
    ...typography.styles.caption,
    color: colors.warning,
    marginLeft: 4,
  },
});

export default MascotaCard;
