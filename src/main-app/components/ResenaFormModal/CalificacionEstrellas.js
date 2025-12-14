import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/styles';
import { styles } from './ResenaFormModal.styles';

// Componente para calificación con estrellas
const CalificacionEstrellas = ({ 
  rating = 0, 
  onRatingChange, 
  maxStars = 5, 
  size = 24,
  interactive = true,
  showHalfStars = false 
}) => {
  const handleStarPress = (starIndex) => {
    if (!interactive) return;
    
    const newRating = starIndex + 1;
    onRatingChange?.(newRating);
  };

  const renderStar = (index) => {
    const starNumber = index + 1;
    let starName = "star-outline";
    let starColor = colors.border.medium;

    if (starNumber <= rating) {
      starName = "star";
      starColor = colors.warning;
    } else if (showHalfStars && starNumber === Math.ceil(rating) && rating % 1 !== 0) {
      starName = "star-half";
      starColor = colors.warning;
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleStarPress(index)}
        disabled={!interactive}
        style={styles.starButton}
        accessibilityLabel={`Calificar ${starNumber} estrella${starNumber > 1 ? 's' : ''}`}
        accessibilityRole="button"
      >
        <Ionicons
          name={starName}
          size={size}
          color={starColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }, (_, index) => renderStar(index))}
    </View>
  );
};

export default CalificacionEstrellas;
