import React from "react";
import { Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { REGISTRO_CONFIG } from "../controller";

/**
 * CampoFecha - Componente controlado y aislado para el date picker
 * Maneja la lógica específica del DateTimePicker
 * 
 * @param {boolean} visible - Si el picker está visible
 * @param {Date} value - Fecha seleccionada
 * @param {function} onChange - Callback cuando cambia la fecha
 */
const CampoFecha = ({ visible, value, onChange }) => {
  if (!visible) return null;

  return (
    <DateTimePicker
      value={value || new Date()}
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"}
      maximumDate={new Date()}
      minimumDate={REGISTRO_CONFIG.MIN_DATE}
      onChange={onChange}
    />
  );
};

export default CampoFecha;

