import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    zIndex: 999,
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuDropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    ...typography.styles.body,
    color: colors.text.primary,
    marginLeft: 12,
    fontWeight: '500',
  },
});

export { styles };
