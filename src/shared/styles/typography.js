// Configuración de tipografía del proyecto
// Define tamaños, espaciados y estilos de texto

import { fontFamily } from './fonts';

// Tamaños de fuente optimizados para legibilidad
export const fontSize = {
  // Texto muy pequeño - usar con precaución
  xs: 12,     // Tooltips, etiquetas pequeñas
  
  // Texto secundario y metadatos
  sm: 14,     // Texto secundario, metadatos
  
  // Texto base para la mayoría del contenido
  base: 16,   // Texto principal, párrafos
  
  // Texto principal y contenido importante
  md: 18,     // Texto destacado, contenido importante
  
  // Subtítulos
  lg: 20,     // Subtítulos de sección
  
  // Títulos secundarios
  xl: 24,     // Títulos de sección
  
  // Títulos principales
  xxl: 28,    // Títulos de página
  
  // Títulos de sección grandes
  xxxl: 32,   // Títulos principales grandes
  
  // Títulos para pantallas grandes/landing
  display: 40 // Títulos display grandes
};

// Altura de línea para mejor legibilidad
export const lineHeight = {
  tight: 1.2,    // Para títulos grandes
  normal: 1.4,   // Para texto normal
  relaxed: 1.6,  // Para párrafos largos
  loose: 1.8,    // Para texto muy espaciado
};

// Espaciado entre letras
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
};

// Configuración completa de tipografía
export const typography = {
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing,
};

export default typography;
