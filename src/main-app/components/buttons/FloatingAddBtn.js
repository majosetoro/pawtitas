import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/styles';

// Botón flotante reutilizable para añadir elementos
const FloatingAddBtn = ({ 
  onPress, 
  icon = 'add', 
  accessibilityLabel = 'Añadir elemento' 
}) => {
  return (
    <TouchableOpacity 
      style={styles.floatingButton}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <Ionicons name={icon} size={28} color={colors.text.inverse} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 90,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.brand.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default FloatingAddBtn;
