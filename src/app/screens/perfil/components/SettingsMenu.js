import React from 'react';
import { Alert, ActionSheetIOS, Platform } from 'react-native';

// Componente para manejar el menú de configuración
export const SettingsMenu = {
  // Menú principal de opciones
  showMainMenu: (onContactSupport) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancelar', 'Contactar Soporte'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: -1,
          title: 'Contáctanos por email para resolver tus dudas, sugerencias o inquietudes'
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            onContactSupport();
          }
        }
      );
    } else {
      // Para Android, usar Alert
      Alert.alert(
        'Contáctanos',
        'Contáctanos por email para resolver tus dudas, sugerencias o inquietudes',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Contactar Soporte', onPress: onContactSupport },
        ]
      );
    }
  },
};
