// Estilos predefinidos para componentes
// Facilita la reutilización y consistencia en toda la app

import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';

// Estilos predefinidos para títulos
export const titleStyles = StyleSheet.create({
  display: {
    fontFamily: typography.fontFamily.titleBold,
    fontSize: typography.fontSize.display,
    color: colors.text,
    lineHeight: typography.fontSize.display * typography.lineHeight.tight,
  },
  h1: {
    fontFamily: typography.fontFamily.titleBold,
    fontSize: typography.fontSize.xxxl,
    color: colors.text,
    lineHeight: typography.fontSize.xxxl * typography.lineHeight.tight,
  },
  h2: {
    fontFamily: typography.fontFamily.titleBold,
    fontSize: typography.fontSize.xxl,
    color: colors.text,
    lineHeight: typography.fontSize.xxl * typography.lineHeight.tight,
  },
  h3: {
    fontFamily: typography.fontFamily.titleMedium,
    fontSize: typography.fontSize.xl,
    color: colors.text,
    lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
  },
  h4: {
    fontFamily: typography.fontFamily.titleMedium,
    fontSize: typography.fontSize.lg,
    color: colors.text,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
});

// Estilos predefinidos para texto
export const textStyles = StyleSheet.create({
  body: {
    fontFamily: typography.fontFamily.text,
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.textMedium,
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  bodyBold: {
    fontFamily: typography.fontFamily.textBold,
    fontSize: typography.fontSize.base,
    color: colors.text,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  caption: {
    fontFamily: typography.fontFamily.text,
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  small: {
    fontFamily: typography.fontFamily.text,
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  label: {
    fontFamily: typography.fontFamily.textMedium,
    fontSize: typography.fontSize.sm,
    color: colors.text,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
});

// Estilos para botones
export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryText: {
    fontFamily: typography.fontFamily.textBold,
    fontSize: typography.fontSize.base,
    color: colors.white,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryText: {
    fontFamily: typography.fontFamily.textBold,
    fontSize: typography.fontSize.base,
    color: colors.primary,
  },
});

export default {
  titleStyles,
  textStyles,
  buttonStyles,
};
