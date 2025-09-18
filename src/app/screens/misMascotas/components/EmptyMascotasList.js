import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../shared/styles';
import { styles } from '../misMascotas.styles';

// Componente para mostrar cuando no hay mascotas registradas
const EmptyMascotasList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="paw-outline"
        size={64}
        color={colors.text.disabled}
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyTitle}>No se encuentran mascotas registradas</Text>
      <Text style={styles.emptySubtitle}>
        Agrega a tus mascotas para brindar un cuidado personalizado
      </Text>
    </View>
  );
};

export default EmptyMascotasList;