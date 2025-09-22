import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 16,
    paddingHorizontal: 20,
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
});

export default styles;
