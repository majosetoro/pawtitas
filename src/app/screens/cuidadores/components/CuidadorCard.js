import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../shared/styles';
import { styles } from './CuidadorCard.styles';

// Componente para mostrar una tarjeta de cuidador individual
const CuidadorCard = ({ cuidador, onPress }) => {
  const { 
    id,
    nombre, 
    rating,
    descripcion,
    precio,
    ubicacion,
    disponibilidad,
    horario,
  } = cuidador;
  
  // Renderizar estrellas de calificación
  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={i <= rating ? colors.warning : colors.border.medium}
        />
      );
    }
    
    return stars;
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            
            <View style={styles.nameContainer}>
              <Text style={styles.nombre}>{nombre}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(rating)}
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.arrowButton}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.descripcion} numberOfLines={3}>
          {descripcion}
        </Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.precio}>{precio}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Ionicons name="location-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{ubicacion}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{disponibilidad}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{horario}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CuidadorCard;
