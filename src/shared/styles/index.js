// Índice de estilos compartidos
// Exporta todos los estilos, temas y constantes de diseño

// Importar archivos de estilos
import colors from './colors';
import typography from './typography';

// Re-exportar para facilitar el uso
export { colors, typography };

// Tema principal que combina colores y tipografía
export const theme = {
  colors,
  typography,
};

// Exportar por defecto el tema completo
export default theme;
