import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../shared/styles';
import { styles } from './MascotasSection.styles';
import { useNavigation } from '@react-navigation/native';

// Componente para la sección de mascotas del usuario
export const MascotasSection = ({ petsCount, description, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('MisMascotas')}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Mis mascotas 🐶🐱 ({petsCount})
          </Text>
          <Text style={styles.description}>
            Gestión de tus mascotas registradas
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={colors.text.secondary} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
