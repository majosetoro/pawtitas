import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  Animated,
  TouchableOpacity 
} from "react-native";
import { styles, getContainerStyle } from "./MensajeFlotante.styles";

/**
 * Componente para mostrar mensajes flotantes de estado
 */
export default function MensajeFlotante({ 
  message, 
  type = "info", 
  visible = false, 
  duration = 4000,
  onHide,
  position = "top"
}) {
  const translateY = useRef(new Animated.Value(position === "bottom" ? 100 : -100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateY.setValue(position === "bottom" ? 100 : -100);
  }, [position]);

  useEffect(() => {
    if (visible && message) {
      // Mostrar mensaje
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-ocultar después de la duración especificada
      const timer = setTimeout(() => {
        hideMessage();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideMessage();
    }
  }, [visible, message]);

  const hideMessage = () => {
    const hideValue = position === "bottom" ? 100 : -100;
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: hideValue,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) {
        onHide();
      }
    });
  };

  if (!message) return null;

  const getMessageStyle = () => {
    switch (type) {
      case "success":
        return styles.successMessage;
      case "error":
        return styles.errorMessage;
      case "warning":
        return styles.warningMessage;
      default:
        return styles.infoMessage;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "success":
        return styles.successText;
      case "error":
        return styles.errorText;
      case "warning":
        return styles.warningText;
      default:
        return styles.infoText;
    }
  };

  return (
    <Animated.View
      style={[
        getContainerStyle(position),
        getMessageStyle(),
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.messageText, getTextStyle()]}>
          {message}
        </Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={hideMessage}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.closeText, getTextStyle()]}>×</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
