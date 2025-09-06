// Índice de estilos compartidos
// Exporta todos los estilos, temas y constantes de diseño

// Definición de colores
export const colors = {

  primary: '#fab7f3ff',
  secondary: '#fcb4b4ff',
  background: '#FDFDFD',
  text: '#333333',
  textSecondary: '#666666',
  border: '#fceeeeff',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
};

// Definición de tipografía
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System-Medium',
    bold: 'System-Bold',
  },
  fontSize: {
    // Base sizes optimizados para legibilidad en web/mobile
    xs: 12,     // Texto muy pequeño, usar con precaución (tooltips, etiquetas)
    sm: 14,     // Texto secundario, metadatos
    base: 16,   // Texto base para la mayoría del contenido
    md: 18,     // Texto principal, contenido importante
    lg: 20,     // Subtítulos
    xl: 24,     // Títulos secundarios
    xxl: 28,    // Títulos principales
    xxxl: 32,   // Títulos de sección grandes
    display: 40 // Títulos para pantallas grandes/landing
  },
};

// Tema principal
export const theme = {
  colors,
  typography,
};

export default theme;
