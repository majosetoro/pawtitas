import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
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
  nameContainer: {
    flex: 1,
  },
  nombre: {
    ...typography.styles.h3,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descripcion: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  precio: {
    ...typography.styles.bodyBold,
    fontSize: 16,
    color: colors.button.primary,
  },
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginLeft: 8,
    flex: 1,
  },
  arrowButton: {
    padding: 4,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
