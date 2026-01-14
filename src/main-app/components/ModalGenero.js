import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./ModalGenero.styles";

const ModalGenero = ({
  visible,
  value,
  options,
  title,
  onChange,
  onClose,
}) => {
  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButton}>X</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={styles.modalPicker}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGenero;

