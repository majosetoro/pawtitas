import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../shared/styles';
import { styles } from './PerfilInfoCard.styles';

// Mostrar la información del perfil del usuario
// Implementar la llamada a la API
export const PerfilInfoCard = ({ user, onEdit }) => {
  // Función para renderizar las estrellas de calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={colors.warning}
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      {/* Header con nombre, rating y botón editar */}
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(user.rating)}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* Descripción del usuario */}
      <Text style={styles.description}>
        {user.description}
      </Text>

      {/* Información de contacto */}
      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Text style={styles.emojiIcon}>✉️</Text>
          <Text style={styles.contactText}>{user.email}</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Text style={styles.emojiIcon}>📞</Text>
          <Text style={styles.contactText}>{user.phone}</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Text style={styles.emojiIcon}>📍</Text>
          <Text style={styles.contactText}>{user.location}</Text>
        </View>
      </View>

      {/* Fecha de registro */}
      <View style={styles.registrationContainer}>
        <Text style={styles.registrationText}>
          Registrado el {user.registrationDate}
        </Text>
      </View>
    </View>
  );
};
