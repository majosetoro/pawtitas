import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../shared/styles';
import GuardarCancelarBtn from '../buttons/GuardarCancelarBtn';
import EstadosChip from '../EstadosChip';
import MenuActions from '../MenuActions';
import { usePrestadorServiciosDetails } from '../../hooks/usePrestadorServiciosDetails';
import { styles } from './PrestadorServiciosDetails.styles';

const PrestadorServiciosDetails = ({ 
  visible, 
  provider, 
  onClose,
  onResenas,
  onConectar,
  providerType = 'cuidador', // Puede ser 'cuidador', 'paseador' o 'veterinario'
  misConexiones = false, 
  onChat,
  onPago,
  onFinalizarServicio,
  onAgregarResena,
  onRechazar,
}) => {
  // Hook para obtener toda la lógica
  const {
    scrollViewRef,
    providerInfo,
    isValidProvider,
    buttonConfig,
    ratingStars,
    modalProps,
    providerTypeText,
    sectionConfig,
    steps,
    createActionHandlers,
    getMenuItems
  } = usePrestadorServiciosDetails(provider, misConexiones, onClose);

  // Acciones
  const actionHandlers = createActionHandlers({
    onResenas,
    onConectar,
    onChat,
    onPago,
    onFinalizarServicio,
    onAgregarResena,
    onRechazar
  });

  // Configuración del menú
  const menuItems = getMenuItems(actionHandlers);

  // Validar proveedor
  if (!isValidProvider) return null;

  const {
    nombre,
    ubicacion,
    precio,
    horario,
    disponibilidad,
    descripcion,
    estado,
  } = providerInfo;

  return (
    <Modal {...modalProps} style={styles.modalContainer}>
      <View style={styles.contentContainer}>
        {/* Handle para arrastrar componente */}
        <View style={styles.handle} />
        
        {/* Header con info básica */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={28} color={colors.primary} />
          </View>
          
          <View style={styles.headerInfo}>
            <View style={styles.nameAndStatusRow}>
              <Text style={styles.nombre}>{nombre}</Text>
              {misConexiones && <EstadosChip estado={estado} showIcon={true} iconSize={14} />}
            </View>
            <View style={styles.ratingContainer}>
              {ratingStars.map((star, index) => (
                <Ionicons
                  key={star.key}
                  name={star.filled ? "star" : "star-outline"}
                  size={16}
                  color={star.filled ? colors.warning : colors.border.medium}
                />
              ))}
            </View>
            <Text style={styles.ubicacion}>{ubicacion}</Text>
          </View>
          
          <View style={styles.headerActions}>
            <MenuActions items={menuItems} />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido Scrolleable */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          bounces={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          persistentScrollbar={true}
        >

          {/* Precio y horarios */}
          <SectionContainer title="Precio y horarios">
            <ContactItem 
              iconName="cash-outline" 
              text={precio} 
            />
            <ContactItem 
              iconName="time-outline" 
              text={horario} 
            />
            <ContactItem 
              iconName="calendar-outline" 
              text={disponibilidad} 
            />
          </SectionContainer>

          {/* Descripción */}
          <SectionContainer title={`Sobre el ${providerTypeText}`}>
            <Text style={styles.descripcion}>{descripcion}</Text>
          </SectionContainer>

          {/* Pasos a seguir. Solo mostrar si NO es Mis Conexiones */}
          {sectionConfig.showSteps && (
            <SectionContainer title="Pasos a seguir:">
              {steps.map((step, index) => (
                <StepItem 
                  key={index}
                  number={step.number} 
                  text={step.text} 
                />
              ))}
            </SectionContainer>
          )}

          {/* Advertencia. Solo mostrar si es Mis Conexiones */}
          {sectionConfig.showWarning && (
            <View style={styles.warningContainer}>
              <View style={styles.warningHeader}>
                <Text style={styles.warningIcon}>{sectionConfig.warningIcon}</Text>
                <Text style={styles.warningTitle}>{sectionConfig.warningTitle}</Text>
              </View>
              <View style={styles.warningContent}>
                {sectionConfig.warningItems.map((item, index) => (
                  <Text key={index} style={styles.warningText}>
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Botones de acción */}
        <View style={styles.actionsContainer}>
          <GuardarCancelarBtn
            label={buttonConfig.primary.label}
            onPress={actionHandlers[buttonConfig.primary.action]}
            variant={buttonConfig.primary.variant}
            showCancel={buttonConfig.secondary?.showCancel || false}
            cancelLabel={buttonConfig.secondary?.label}
            onCancel={buttonConfig.secondary ? actionHandlers[buttonConfig.secondary.action] : undefined}
          />
        </View>
      </View>
    </Modal>
  );
};

// Componentes reutilizables
const SectionContainer = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ContactItem = ({ iconName, text }) => (
  <View style={styles.contactItem}>
    <Ionicons name={iconName} size={20} color={colors.primaryDark} />
    <Text style={styles.contactText}>{text}</Text>
  </View>
);

const StepItem = ({ number, text }) => (
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

export default PrestadorServiciosDetails;
