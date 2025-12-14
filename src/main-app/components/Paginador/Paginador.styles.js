import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    marginTop: 2,
    marginBottom: 40,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  
  // Botones de flecha (anterior/siguiente)
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  
  // Flecha deshabilitada
  arrowButtonDisabled: {
    backgroundColor: colors.surfaceVariant,
    borderColor: colors.border.light,
  },
  
  // Números de página
  pagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  
  // Botón de página
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  
  // Página activa
  pageButtonActive: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  pageText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  
  pageTextActive: {
    color: colors.surface,
    fontWeight: 'bold',
  },
  
  // Puntos suspensivos (ellipsis)
  ellipsisContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  
  ellipsisText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.secondary,
    letterSpacing: 2,
  },
});

