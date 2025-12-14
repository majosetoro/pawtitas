import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  avatarContainer: {
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    resizeMode: 'cover',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  helpText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginTop: 8,
    fontSize: 12,
    fontStyle: 'italic',
  },
});

