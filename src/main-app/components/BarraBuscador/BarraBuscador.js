import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/styles';
import { styles } from './BarraBuscador.styles';

// Componente reutilizable para barra de búsqueda
const BarraBuscador = ({
  value,
  onChangeText,
  placeholder = "Buscar...",
  onFilterPress,
  filterIcon = "menu-outline"
}) => {
  // Si no hay filtro o no se muestra, retorna null
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchRow}>
        {onFilterPress && (
          <TouchableOpacity 
            style={styles.filterIconButton}
            onPress={onFilterPress}
          >
            <Ionicons 
              name={filterIcon} 
              size={20} 
              color={colors.text.secondary} 
            />
          </TouchableOpacity>
        )}
        
        <View style={styles.searchInputContainer}>
          <Ionicons 
            name="search-outline" 
            size={20} 
            color={colors.text.secondary} 
          />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholder}
            placeholderTextColor={colors.text.secondary}
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>
    </View>
  );
};

export default BarraBuscador;
