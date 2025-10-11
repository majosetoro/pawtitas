import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  usersList: {
    paddingVertical: 10,
  },
  userItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...typography.styles.subtitle,
    color: colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  userPerfil: {
    ...typography.styles.caption,
    color: colors.brand.accent,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
});
