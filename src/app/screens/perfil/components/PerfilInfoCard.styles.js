import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/styles';

// Estilos para el componente PerfilInfoCard
export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border.light,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  headerWithAvatar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 48,
    height: 48,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameContainer: {
    flex: 1,
  },
  userName: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  editText: {
    ...typography.styles.caption,
    color: colors.text.primary,
    marginLeft: 6,
    fontWeight: '600',
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  contactInfo: {
    marginBottom: 20,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 16,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
  },
  emojiIcon: {
    fontSize: 20,
    width: 24,
    textAlign: 'center',
  },
  contactText: {
    ...typography.styles.body,
    color: colors.text.primary,
    marginLeft: 16,
    fontSize: 15,
    fontWeight: '500',
  },
  registrationContainer: {
    alignItems: 'flex-end',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-end',
  },
  registrationText: {
    ...typography.styles.small,
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default styles;
