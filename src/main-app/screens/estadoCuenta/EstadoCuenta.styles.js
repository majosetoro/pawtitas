import { StyleSheet } from 'react-native';
import { colors, typography } from '../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    ...typography.styles.h2,
    color: colors.text.primary,
    marginBottom: 12,
  },
  message: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  motivo: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
  },
});

export default styles;
