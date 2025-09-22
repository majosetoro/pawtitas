import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 16,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'nowrap',
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
});

export default styles;
