import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './Filtros.styles';

// Componente reutilizable para barra de filtros
const Filtros = ({
  filters = [],
  selectedFilter,
  onFilterChange,
  visible = true
}) => {
  // Si no hay filtros o no se muestra, retorna null
  if (!visible || filters.length === 0) return null;

  return (
    <View style={styles.scrollView}>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {filters.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.filterButtonActive
            ]}
            onPress={() => onFilterChange(filter.key)}
          >
            <Text style={[
              styles.filterButtonText,
              selectedFilter === filter.key && styles.filterButtonTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Filtros;
