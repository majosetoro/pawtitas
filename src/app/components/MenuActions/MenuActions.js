import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../../../shared/styles';
import { styles } from './MenuActions.styles';

// Menú de acciones con ícono de 3 puntos
const MenuActions = ({
  items = [],
  visible = true,
  onClose,
  iconColor = colors.text.secondary,
  iconSize = 20,
  buttonStyle,
  menuStyle,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // Apertura/cierre del menú
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // Selección de un elemento del menú
  const handleItemPress = (item) => {
    setShowMenu(false);
    if (item.onPress) {
      item.onPress();
    }
  };

  // Cerrar menú cuando se toque afuera
  const handleCloseMenu = () => {
    setShowMenu(false);
    if (onClose) {
      onClose();
    }
  };

  // No renderizar si no es visible o no hay items
  if (!visible || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {showMenu && (
        <TouchableWithoutFeedback onPress={handleCloseMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      {/* Botón del menú */}
      <TouchableOpacity 
        style={[styles.menuButton, buttonStyle]}
        onPress={handleMenuToggle}
        activeOpacity={0.7}
      >
        <Ionicons name="ellipsis-horizontal" size={iconSize} color={iconColor} />
      </TouchableOpacity>
      
      {/* Menú desplegable */}
      {showMenu && (
        <View style={[styles.menuDropdown, menuStyle]}>
          {items.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => handleItemPress(item)}
              activeOpacity={0.7}
            >
              {item.icon && (
                <Ionicons 
                  name={item.icon} 
                  size={16} 
                  color={item.iconColor || colors.text.secondary} 
                />
              )}
              <Text style={[
                styles.menuItemText,
                item.textStyle,
                item.iconColor && { color: item.iconColor }
              ]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default MenuActions;
