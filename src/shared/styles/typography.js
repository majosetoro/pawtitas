// Configuración de tipografía con Google Fonts
// Quicksand para títulos, Nunito para texto general

export const typography = {
  // Configuración de fuentes
  fontFamily: {
    // Títulos con Quicksand
    title: 'Quicksand_700Bold',
    titleMedium: 'Quicksand_600SemiBold',
    titleRegular: 'Quicksand_500Medium',
    
    // Texto general con Nunito
    body: 'Nunito_400Regular',
    bodyMedium: 'Nunito_500Medium',
    bodySemiBold: 'Nunito_600SemiBold',
    bodyBold: 'Nunito_700Bold',
    
    // Fallback para compatibilidad
    fallback: 'System',
  },

  // Tamaños de fuente
  fontSize: {
    // Títulos
    titleLarge: 32,    // Títulos principales
    titleMedium: 24,   // Títulos secundarios
    titleSmall: 20,    // Subtítulos
    
    // Texto
    bodyLarge: 18,     // Texto principal grande
    bodyMedium: 16,    // Texto base
    bodySmall: 14,     // Texto secundario
    caption: 12,       // Texto muy pequeño
    
    // Especiales
    display: 40,       // Títulos de pantalla completa
    overline: 10,      // Texto de etiquetas
  },

  // Estilos predefinidos para reutilización
  styles: {
    // Títulos
    h1: {
      fontFamily: 'Quicksand_700Bold',
      fontSize: 32,
      lineHeight: 40,
    },
    h2: {
      fontFamily: 'Quicksand_600SemiBold',
      fontSize: 24,
      lineHeight: 32,
    },
    h3: {
      fontFamily: 'Quicksand_500Medium',
      fontSize: 20,
      lineHeight: 28,
    },
    
    // Texto
    body: {
      fontFamily: 'Nunito_400Regular',
      fontSize: 16,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'Nunito_500Medium',
      fontSize: 16,
      lineHeight: 24,
    },
    bodyBold: {
      fontFamily: 'Nunito_700Bold',
      fontSize: 16,
      lineHeight: 24,
    },
    
    // Texto pequeño
    caption: {
      fontFamily: 'Nunito_400Regular',
      fontSize: 14,
      lineHeight: 20,
    },
    small: {
      fontFamily: 'Nunito_400Regular',
      fontSize: 12,
      lineHeight: 16,
    },
    
    // Botones
    button: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 16,
      lineHeight: 24,
    },
    buttonSmall: {
      fontFamily: 'Nunito_600SemiBold',
      fontSize: 14,
      lineHeight: 20,
    },
  },
};

export default typography;
