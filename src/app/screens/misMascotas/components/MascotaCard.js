import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../../../shared/styles';

// Componente para mostrar una tarjeta de mascota individual
const MascotaCard = ({ mascota, onPress }) => {
  const { nombre, tipo, edad, descripcion, condicionEspecial } = mascota;
  
  return (
    <View 
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.nombre}>{nombre}</Text>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Ionicons name="pencil-outline" size={16} color={colors.text.secondary} />
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.tipoEdad}>
            {tipo}, {edad} {edad === 1 ? 'año' : 'años'}
          </Text>
          
          <Text style={styles.descripcion} numberOfLines={5}>
            {descripcion}
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
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editText: {
    ...typography.styles.caption,
    color: colors.text.primary,
    marginLeft: 6,
    fontWeight: '600',
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
