import React from 'react';
import { View, Text } from 'react-native';
import CalificacionEstrellas from './CalificacionEstrellas';
import { styles } from './ResenaFormModal.styles';

// Sección de calificación con estrellas
export const SeccionCalificacion = ({ rating, onRatingChange, error }) => (
  <View style={styles.ratingSection}>
    <CalificacionEstrellas
      rating={rating}
      onRatingChange={onRatingChange}
      size={32}
      interactive={true}
    />
    {rating > 0 && (
      <Text style={styles.ratingText}>
        {rating} estrella{rating > 1 ? 's' : ''} seleccionada{rating > 1 ? 's' : ''}
      </Text>
    )}
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);
