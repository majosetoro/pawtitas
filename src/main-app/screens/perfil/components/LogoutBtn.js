import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './LogoutBtn.styles';

// Componente para el botón de cerrar sesión

export const LogoutBtn = ({ onPress, label = 'Cerrar Sesión' }) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};
