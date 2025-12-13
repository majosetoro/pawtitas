import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './BottomNavbar.styles';
import { colors } from '../../../shared/styles';

// Componente reutilizable para el menú inferior
const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Configuración de las rutas de navegación
  const navItems = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home-sharp', route: 'Home' },
    { name: 'Mapa', icon: 'location-outline', activeIcon: 'location-sharp', route: 'Mapa' },
    { name: 'Chat', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses', route: 'Chat' },
    { name: 'Perfil', icon: 'person-outline', activeIcon: 'person-sharp', route: 'Perfil' },
  ];

  // Navega a la ruta
  const navigateTo = (routeName) => {
    if (route.name !== routeName) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const isActive = route.name === item.route;
          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => navigateTo(item.route)}
              accessibilityLabel={item.name}
              accessibilityRole="button"
            >
              <Ionicons
                name={isActive ? item.activeIcon : item.icon}
                size={24}
                color={isActive ? colors.navigation.active : colors.navigation.inactive}
              />
              {isActive && (
                <Text style={[styles.navText, styles.activeText]}>
                  {item.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavbar;
