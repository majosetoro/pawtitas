// Definición de fuentes del proyecto
// Centraliza todas las fuentes utilizadas en la aplicación

export const fonts = {
  // Fuentes para títulos (Quicksand)
  title: {
    regular: 'Quicksand_400Regular',
    medium: 'Quicksand_500Medium',
    semiBold: 'Quicksand_600SemiBold',
    bold: 'Quicksand_700Bold',
  },
  
  // Fuentes para texto (Nunito)
  text: {
    regular: 'Nunito_400Regular',
    medium: 'Nunito_500Medium',
    semiBold: 'Nunito_600SemiBold',
    bold: 'Nunito_700Bold',
  },
  
  // Fallbacks del sistema para compatibilidad
  system: {
    regular: 'System',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
};

// Alias para facilitar el uso
export const fontFamily = {
  // Títulos
  title: fonts.title.regular,
  titleMedium: fonts.title.medium,
  titleSemiBold: fonts.title.semiBold,
  titleBold: fonts.title.bold,
  
  // Texto
  text: fonts.text.regular,
  textMedium: fonts.text.medium,
  textSemiBold: fonts.text.semiBold,
  textBold: fonts.text.bold,
  
  // Fallbacks
  regular: fonts.system.regular,
  medium: fonts.system.medium,
  bold: fonts.system.bold,
};

export default fonts;
