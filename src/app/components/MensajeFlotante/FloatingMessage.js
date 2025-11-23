import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated,
  TouchableOpacity 
} from "react-native";
import { colors, typography } from "../../../shared/styles";

/**
 * Componente para mostrar mensajes flotantes de estado
 */
export default function FloatingMessage({ 
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

const getContainerStyle = (position) => ({
  position: "absolute",
  ...(position === "bottom" ? { bottom: 20 } : { top: 60 }),
  left: 20,
  right: 20,
  zIndex: 1000,
  borderRadius: 12,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 8,
});

const styles = StyleSheet.create({
  container: {
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageText: {
    ...typography.styles.body,
    flex: 1,
    fontWeight: "500",
  },
  closeButton: {
    marginLeft: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },

  // Estilos por tipo de mensaje
  successMessage: {
    backgroundColor: colors.success,
  },
  errorMessage: {
    backgroundColor: colors.error,
  },
  warningMessage: {
    backgroundColor: colors.warning,
  },
  infoMessage: {
    backgroundColor: colors.primaryDark,
  },
  successText: {
    color: colors.text.inverse,
  },
  errorText: {
    color: colors.text.inverse,
  },
  warningText: {
    color: colors.text.inverse,
  },
  infoText: {
    color: colors.text.inverse,
  },
});
