import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity 
} from 'react-native';
import { colors, typography } from '../../shared/styles';

// Componente reutilizable para mostrar diálogos de confirmación
export default function ConfirmacionDialogo({ 
  visible, 
  title, 
  message, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar", 
  onConfirm, 
  onCancel,
  type = "warning",
  usePortal = true
}) {
  const getConfirmButtonStyle = () => {
    switch (type) {
      case "danger":
        return styles.dangerButton;
      case "info":
        return styles.infoButton;
      default:
        return styles.warningButton;
    }
  };

  const getConfirmButtonTextStyle = () => {
    switch (type) {
      case "danger":
        return styles.dangerButtonText;
      case "info":
        return styles.infoButtonText;
      default:
        return styles.warningButtonText;
    }
  };

  const content = (
    <View style={usePortal ? styles.overlay : styles.overlayInline}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              try {
                onCancel && onCancel();
              } catch (error) {
                console.error('Error en onCancel:', error);
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>{cancelText}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, getConfirmButtonStyle()]}
            onPress={() => {
              try {
                onConfirm && onConfirm();
              } catch (error) {
                console.error('Error en onConfirm:', error);
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={getConfirmButtonTextStyle()}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!usePortal) {
    return visible ? content : null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        onCancel?.();
      }}
    >
      {content}
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayInline: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  title: {
    ...typography.styles.body,
    fontSize: 20,
    color: colors.text.primary,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    ...typography.styles.body,
    color: colors.text.secondary,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  warningButton: {
    backgroundColor: colors.warning,
    shadowColor: colors.warning,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dangerButton: {
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  infoButton: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButtonText: {
    ...typography.styles.button,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  warningButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  dangerButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  infoButtonText: {
    ...typography.styles.button,
    color: colors.text.inverse,
    fontWeight: '600',
  },
};
