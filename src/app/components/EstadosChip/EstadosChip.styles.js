import { StyleSheet } from 'react-native';
import { typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  icon: {
    marginRight: 2,
  },
  text: {
    ...typography.styles.caption,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

