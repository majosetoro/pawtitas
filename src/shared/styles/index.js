// Índice de estilos compartidos
// Exporta todos los estilos, temas y constantes de diseño

// Importar módulos separados
import colors from './colors';
import typography from './typography';
import fonts from './fonts';
import { titleStyles, textStyles, buttonStyles } from './components';

// Re-exportar para mantener compatibilidad
export { colors, typography, fonts, titleStyles, textStyles, buttonStyles };

// Tema principal que combina todos los estilos
export const theme = {
  colors,
  typography,
  fonts,
};

// Exportación por defecto
export default theme;
