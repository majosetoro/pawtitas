import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../../../../shared/styles';
import { styles } from './EstadisticasCard.styles';

// Componente para mostrar estadísticas de usuarios en el panel de administrador
const EstadisticasCard = ({ statistics }) => {
  const {
    activados = 0,
    pendientes = 0,
    desactivados = 0,
    total = 0
  } = statistics;

  return (
    <View style={styles.container}>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.success }]}>
            {activados}
          </Text>
          <Text style={styles.statLabel}>Activados</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.warning }]}>
            {pendientes}
          </Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.error }]}>
            {desactivados}
          </Text>
          <Text style={styles.statLabel}>Desactivados</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text.primary }]}>
            {total}
          </Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );
};

export default EstadisticasCard;
