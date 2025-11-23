import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './AvatarPicker.styles';
import { colors } from '../../../shared/styles';
import FloatingMessage from '../MensajeFlotante';

// Componente para seleccionar avatar
const AvatarPicker = ({ 
  iconName = "person", 
  size = 64, 
  imageUri = null,
  onImageSelected 
}) => {
  const [loading, setLoading] = useState(false);
  const [floatingMessage, setFloatingMessage] = useState({
    visible: false,
    message: '',
    type: 'error'
  });

  // Mensajes flotantes
  const showFloatingMessage = (message, type = 'error') => {
    setFloatingMessage({
      visible: true,
      message,
      type
    });
  };

  const hideFloatingMessage = () => {
    setFloatingMessage(prev => ({
      ...prev,
      visible: false
    }));
  };

  // Solicitar permisos y seleccionar imagen
  const pickImage = async () => {
    try {
      // Solicitar permisos para acceder a la galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        showFloatingMessage(
          'Necesitamos permiso para acceder a tus fotos. Por favor, habilítalo en la configuración de tu dispositivo.',
          'error'
        );
        return;
      }

      setLoading(true);

      // Lanzar el selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        onImageSelected(selectedImage);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      showFloatingMessage(
        'Hubo un problema al seleccionar la imagen. Por favor, intenta de nuevo.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Tomar foto con la cámara
  const takePhoto = async () => {
    try {
      // Solicitar permisos para acceder a la cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        showFloatingMessage(
          'Necesitamos permiso para acceder a tu cámara. Por favor, habilítalo en la configuración de tu dispositivo.',
          'error'
        );
        return;
      }

      setLoading(true);

      // Lanzar la cámara
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        onImageSelected(selectedImage);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      showFloatingMessage(
        'Hubo un problema al tomar la foto. Por favor, intenta de nuevo.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Elegir entre galería o cámara
  const showImageOptions = () => {
    Alert.alert(
      'Seleccionar imagen de perfil',
      'Elige cómo subir tu foto de perfil. Recomendamos que sea nítida y de buena calidad.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Galería',
          onPress: pickImage,
        },
        {
          text: 'Cámara',
          onPress: takePhoto,
        },
      ],
      { cancelable: true }
    );
  };

  const radius = size / 2;
  const iconSize = size / 2;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.avatarContainer,
          {
            width: size,
            height: size,
            borderRadius: radius,
          },
        ]}
        onPress={showImageOptions}
        activeOpacity={0.8}
        disabled={loading}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={[
              styles.avatarImage,
              {
                width: size,
                height: size,
                borderRadius: radius,
              },
            ]}
          />
        ) : (
          <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={iconSize} color={colors.primary} />
          </View>
        )}
        
        {/* Cambiar/agregar imagen de perfil */}
        <View style={styles.editBadge}>
          <Ionicons 
            name={imageUri ? "camera" : "add"} 
            size={16} 
            color={colors.surface} 
          />
        </View>
      </TouchableOpacity>
      
      <Text style={styles.helpText}>
        {imageUri ? 'Cambiar imagen' : 'Agregar imagen de perfil'}
      </Text>
      
      <FloatingMessage
        visible={floatingMessage.visible}
        message={floatingMessage.message}
        type={floatingMessage.type}
        onHide={hideFloatingMessage}
      />
    </View>
  );
};

export default AvatarPicker;

