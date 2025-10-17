import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20', // 20% opacity
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  nombreUsuario: {
    ...typography.styles.h3,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoResena: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  fecha: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    fontSize: 12,
    marginBottom: 8,
  },
});
