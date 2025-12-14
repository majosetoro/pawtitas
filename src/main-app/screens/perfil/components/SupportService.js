import { Alert } from 'react-native';

// Servicio para manejar las comunicaciones de soporte
export const SupportService = {
  // Mostrar información de contacto
  contactEmail: () => {
    Alert.alert(
      'Contactar Soporte - Email',
      'Andrea Paez: andrea.paez@davinci.edu.ar\n' +
      'María José Toro: maria.toro@davinci.edu.ar\n' +
      'María Elisa Zubiri: maria.zubiri@davinci.edu.ar\n\n' +
      'Asunto sugerido: Soporte - APP Pawtitas',
      [{ text: 'Entendido' }]
    );
  }
};
