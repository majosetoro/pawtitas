import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../shared/styles';

/**
 * Estilos para el componente BottomNavbar
 * Separación de estilos siguiendo el principio de Separación de Responsabilidades
 */
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  navText: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  activeText: {
    color: colors.navigation.active,
    fontWeight: '600',
  },
  inactiveText: {
    color: colors.navigation.inactive,
  },
  activeColor: colors.navigation.active,
  inactiveColor: colors.navigation.inactive,
  indicator: {
    position: 'absolute',
    height: 3,
    width: 20,
    borderRadius: 3,
    backgroundColor: colors.navigation.active,
    bottom: -2,
    opacity: 0.8,
  }
});

export default styles;
