import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    position: 'relative',
    marginBottom: 8,
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 999,
  },
  content: {
    padding: 16,
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  nombre: {
    ...typography.styles.h3,
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 2,
  },
  descripcion: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  perfilContainer: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  perfilText: {
    ...typography.styles.caption,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  statusContainer: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  statusText: {
    ...typography.styles.caption,
    fontWeight: '600',
  },
  dateText: {
    ...typography.styles.small,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  arrowButton: {
    padding: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
