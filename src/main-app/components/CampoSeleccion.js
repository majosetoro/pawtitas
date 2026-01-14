import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./CampoSeleccion.styles";

/**
 * CampoSeleccion - Componente reutilizable para campos de selección
 * Maneja la UI base (input clickeable + error) de manera consistente
 * 
 * @param {string} value - Valor seleccionado
 * @param {string} placeholder - Texto placeholder
 * @param {string} label - Texto a mostrar cuando hay valor
 * @param {string} error - Mensaje de error
 * @param {function} onOpen - Callback cuando se hace clic
 */
const CampoSeleccion = ({
  value,
  placeholder,
  label,
  error,
  onOpen,
}) => {
  const textStyle = value ? styles.selectedText : styles.placeholderText;
  const displayText = label || placeholder;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.input,
          styles.dateInput,
          error && styles.inputError,
        ]}
        onPress={onOpen}
      >
        <Text style={textStyle}>
          {displayText}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </>
  );
};

export default CampoSeleccion;

