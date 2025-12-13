import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

// Estilos para la pantalla de perfil
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espacio para el MenuInferior
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
    shadowColor: colors.brand.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default styles;
