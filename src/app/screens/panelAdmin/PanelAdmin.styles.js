import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

// Estilos para la pantalla del Panel de Administrador
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  mainTitle: {
    ...typography.styles.h2,
    color: colors.brand.accent,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsTabContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statsTab: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    padding: 12,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...typography.styles.h3,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  statLabel: {
    ...typography.styles.small,
    color: colors.text.secondary,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIconButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border.light,
    flex: 1,
  },
  searchInput: {
    ...typography.styles.body,
    color: colors.text.primary,
    marginLeft: 12,
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  filterButtonActive: {
    backgroundColor: colors.brand.accent,
    borderColor: colors.brand.accent,
  },
  filterButtonText: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.text.inverse,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  usersList: {
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
});

export default styles;
