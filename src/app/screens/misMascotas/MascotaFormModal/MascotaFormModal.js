import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckboxField } from './CheckboxField';
import { FloatingMessage, ConfirmacionDialogo } from '../../../components';
import { styles } from './MascotaFormModal.styles';
import { colors } from '../../../../shared/styles';

// Constantes de configuración
const FORM_CONFIG = {
  FLOATING_MESSAGE_DURATION: 4000,
  DEFAULT_AGE_UNIT: 'años',
  AGE_UNITS: ['años', 'meses'],
  TEXTAREA_LINES: 4,
  INPUT_HEIGHT: 44,
  TEXTAREA_HEIGHT: 100
};

const VALIDATION_RULES = {
  nombre: {
    required: true,
    message: 'El nombre es obligatorio'
  },
  edad: {
    required: true,
    message: 'La edad es obligatoria',
    numeric: true,
    min: 0.1,
    numericMessage: 'La edad debe ser un número válido mayor a 0'
  },
  especie: {
    required: true,
    message: 'La especie es obligatoria'
  },
  raza: {
    required: true,
    message: 'La raza es obligatoria'
  }
};

const PLACEHOLDERS = {
  nombre: 'Ej: Luna',
  edad: 'Ej: 2',
  especie: 'Ej: Perro, gato, conejo',
  raza: 'Ej: Golden Retriever',
  infoAdicional: 'Información adicional sobre la mascota'
};

const MEDICAL_CHECKBOXES = [
  {
    key: 'padeceEnfermedad',
    label: '¿Padece alguna enfermedad?',
    description: 'Ejemplo: alergias, problemas cardíacos o respiratorios, entre otros.'
  },
  {
    key: 'requiereMedicacion',
    label: '¿Requiere medicación?',
    description: 'Ejemplo: antibióticos, calmantes, entre otros.'
  },
  {
    key: 'cuidadoEspecial',
    label: '¿Necesita cuidados especiales?',
    description: 'Ejemplo: dieta específica, supervisión extra, movilidad reducida, entre otros.'
  }
];

// Estado inicial del formulario
const getInitialFormData = (mascotaData = null) => ({
  nombre: mascotaData?.nombre || '',
  edad: mascotaData?.edad ? String(mascotaData.edad) : '',
  edadUnidad: mascotaData?.edadUnidad || FORM_CONFIG.DEFAULT_AGE_UNIT,
  especie: mascotaData?.especie || '',
  raza: mascotaData?.raza || '',
  infoAdicional: mascotaData?.infoAdicional || '',
  infoMedica: mascotaData?.infoMedica || '',
  padeceEnfermedad: mascotaData?.padeceEnfermedad || false,
  requiereMedicacion: mascotaData?.requiereMedicacion || false,
  cuidadoEspecial: mascotaData?.cuidadoEspecial || false
});

// Componente para el modal de mascota 
const MascotaFormModal = ({ 
  visible, 
  onClose, 
  mascotaData = null,
  onSave 
}) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState(() => getInitialFormData(mascotaData));

  // Estado para validación y mensajes
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showFloatingMessage, setShowFloatingMessage] = useState(false);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  // Actualizar los datos del formulario cuando mascotaData cambia
  useEffect(() => {
    setFormData(getInitialFormData(mascotaData));
    
    // Limpiar errores y mensajes al cambiar los datos
    setErrors({});
    setMessage({ type: "", text: "" });
    setShowFloatingMessage(false);
  }, [mascotaData]);

  // Manejar cambios en los inputs
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, [errors]);

  // Función de validación reutilizable
  const validateField = useCallback((field, value, rules) => {
    if (rules.required && !value.trim()) {
      return rules.message;
    }
    
    if (rules.numeric && value.trim()) {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < rules.min) {
        return rules.numericMessage;
      }
    }
    
    return null;
  }, []);

  // Validar los datos del formulario
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    Object.entries(VALIDATION_RULES).forEach(([field, rules]) => {
      const error = validateField(field, formData[field], rules);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  // Manejar el envío del formulario
  const handleSubmit = useCallback(() => {
    if (!validateForm()) {
      setMessage({ type: "error", text: "Por favor, corrige los errores en el formulario" });
      setShowFloatingMessage(true);
      return;
    }

    // Llamar a la función onSave con los datos del formulario
    onSave(formData);
    onClose();
  }, [validateForm, formData, onSave, onClose]);

  // Manejar el ocultamiento del mensaje flotante
  const handleHideFloatingMessage = useCallback(() => {
    setShowFloatingMessage(false);
    setMessage({ type: "", text: "" });
  }, []);

  // Verificar si el formulario tiene datos
  const hasFormData = useMemo(() => {
    return (
      formData.nombre.trim() !== '' ||
      formData.edad.trim() !== '' ||
      formData.especie.trim() !== '' ||
      formData.raza.trim() !== '' ||
      formData.infoAdicional.trim() !== '' ||
      formData.padeceEnfermedad ||
      formData.requiereMedicacion ||
      formData.cuidadoEspecial
    );
  }, [formData]);

  // Manejar el intento de cerrar el modal
  const handleCloseAttempt = useCallback(() => {
    try {
      if (hasFormData) {
        setShowExitConfirmation(true);
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error al intentar cerrar modal:', error);
      // Fallback: cerrar directamente
      onClose();
    }
  }, [hasFormData, onClose]);

  // Confirmar salida y cerrar modal
  const confirmExit = useCallback(() => {
    try {
      // Cerrar el modal de confirmación primero
      setShowExitConfirmation(false);
      // Luego cerrar el modal principal
      onClose();
    } catch (error) {
      console.error('Error al confirmar salida:', error);
      // Fallback: cerrar directamente
      onClose();
    }
  }, [onClose]);

  // Cancelar salida
  const cancelExit = useCallback(() => {
    setShowExitConfirmation(false);
  }, []);

  // Renderizar el modal
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        {/* Mensaje flotante */}
        <FloatingMessage
          message={message.text}
          type={message.type}
          visible={showFloatingMessage}
          onHide={handleHideFloatingMessage}
          duration={FORM_CONFIG.FLOATING_MESSAGE_DURATION}
        />
        
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {mascotaData ? 'Editar mascota' : 'Registrar mascota'}
            </Text>
            <TouchableOpacity onPress={handleCloseAttempt} style={styles.closeButton}>
              <Ionicons name="close" size={16} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre *</Text>
            <TextInput
                style={[styles.input, errors.nombre && styles.inputError]}
                value={formData.nombre}
                onChangeText={(value) => handleInputChange('nombre', value)}
                placeholder={PLACEHOLDERS.nombre}
                placeholderTextColor={colors.text.disabled}
            />
            {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Edad *</Text>
              <View style={styles.edadContainer}>
                <TextInput
                  style={[styles.edadInput, errors.edad && styles.inputError]}
                  value={formData.edad}
                  onChangeText={(value) => handleInputChange('edad', value)}
                  placeholder={PLACEHOLDERS.edad}
                  placeholderTextColor={colors.text.disabled}
                  keyboardType="numeric"
                />
                <View style={styles.unidadSelector}>
                  {FORM_CONFIG.AGE_UNITS.map((unit) => (
                    <TouchableOpacity
                      key={unit}
                      style={[
                        styles.unidadButton,
                        formData.edadUnidad === unit && styles.unidadButtonActive
                      ]}
                      onPress={() => handleInputChange('edadUnidad', unit)}
                    >
                      <Text style={[
                        styles.unidadButtonText,
                        formData.edadUnidad === unit && styles.unidadButtonTextActive
                      ]}>
                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {errors.edad && <Text style={styles.errorText}>{errors.edad}</Text>}
            </View>

            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Especie *</Text>
            <TextInput
                style={[styles.input, errors.especie && styles.inputError]}
                value={formData.especie}
                onChangeText={(value) => handleInputChange('especie', value)}
                placeholder={PLACEHOLDERS.especie}
                placeholderTextColor={colors.text.disabled}
            />
            {errors.especie && <Text style={styles.errorText}>{errors.especie}</Text>}
            </View>

            <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Raza *</Text>
            <TextInput
                style={[styles.input, errors.raza && styles.inputError]}
                value={formData.raza}
                onChangeText={(value) => handleInputChange('raza', value)}
                placeholder={PLACEHOLDERS.raza}
                placeholderTextColor={colors.text.disabled}
            />
            {errors.raza && <Text style={styles.errorText}>{errors.raza}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Información Adicional</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.infoAdicional}
                onChangeText={(value) => handleInputChange('infoAdicional', value)}
                placeholder={PLACEHOLDERS.infoAdicional}
                placeholderTextColor={colors.text.disabled}
                multiline={true}
                numberOfLines={FORM_CONFIG.TEXTAREA_LINES}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.medicalInfoTitle}>Información Médica</Text>
              <Text style={styles.medicalInfoCaption}>
                Selecciona las opciones que correspondan, y en caso de ser necesario, detallar en el campo de Información Adicional.
              </Text>
              
              <View style={styles.medicalInfoContainer}>
                {MEDICAL_CHECKBOXES.map((checkbox) => (
                  <CheckboxField
                    key={checkbox.key}
                    label={checkbox.label}
                    description={checkbox.description}
                    checked={formData[checkbox.key]}
                    onToggle={(value) => handleInputChange(checkbox.key, value)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={styles.guardarButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.guardarButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modal de confirmación de salida */}
      <ConfirmacionDialogo
        visible={showExitConfirmation}
        title="Descartar cambios"
        message="Has realizado cambios en el formulario. ¿Estás seguro de que quieres salir sin guardar?"
        confirmText="Salir"
        cancelText="Cancelar"
        onConfirm={confirmExit}
        onCancel={cancelExit}
        type="danger"
        usePortal={false}
      />
    </Modal>
  );
};

export default MascotaFormModal;
