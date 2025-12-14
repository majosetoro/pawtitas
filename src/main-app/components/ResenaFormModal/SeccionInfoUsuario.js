import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/styles';
import { styles } from './ResenaFormModal.styles';

// Sección de información del usuario en el formulario de reseña
export const SeccionInfoUsuario = ({ usuario, tipoUsuario }) => {
  if (!usuario?.nombre) return null;

  return (
    <View style={styles.userInfoContainer}>
      {usuario.avatar ? (
        <Image source={{ uri: usuario.avatar }} style={styles.userAvatar} />
      ) : (
        <View style={[styles.userAvatar, { alignItems: 'center', justifyContent: 'center' }]}>
          <Ionicons name="person" size={30} color={colors.primary} />
        </View>
      )}
      <Text style={styles.userName}>{usuario.nombre}</Text>
      <Text style={styles.userType}>{usuario.tipo || tipoUsuario}</Text>
    </View>
  );
};
