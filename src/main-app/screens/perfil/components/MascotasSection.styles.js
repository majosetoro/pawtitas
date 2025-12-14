import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/styles';

// Estilos para el componente MascotasSection
export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border.light,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.styles.bodyBold,
    color: colors.text.primary,
    marginBottom: 6,
    fontSize: 16,
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 22,
    fontSize: 14,
  },
  arrowContainer: {
    marginLeft: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: 8,
  },
});

export default styles;
