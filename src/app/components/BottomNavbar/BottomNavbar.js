import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './BottomNavbar.styles';

// Componente reutilizable para el menú inferior
const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Configuración de las rutas de navegación
  const navItems = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home-sharp', route: 'Home' },
    { name: 'Mapa', icon: 'location-outline', activeIcon: 'location-sharp', route: 'Mapa' },
    { name: 'Chat', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses', route: 'Chat' },
    { name: 'Perfil', icon: 'person-outline', activeIcon: 'person-sharp', route: 'EditarPerfil' },
  ];

  // Navega a la ruta
  const navigateTo = (routeName) => {
    if (route.name !== routeName) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.container}>
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
              size={isActive ? 26 : 24}
              color={isActive ? styles.activeColor : styles.inactiveColor}
            />
            <Text
              style={[
                styles.navText,
                isActive ? styles.activeText : styles.inactiveText,
              ]}
            >
              {item.name}
            </Text>
            {isActive && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavbar;
