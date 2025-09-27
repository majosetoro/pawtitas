import React, { useRef, useMemo } from 'react';
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
import { styles } from './PrestadorServiciosDetails.styles';

const PrestadorServiciosDetails = ({ 
  visible, 
  provider, 
  onClose,
  onResenas,
  onConectar,
  providerType = 'cuidador' // Puede ser 'cuidador', 'paseador' o 'veterinario'
}) => {
  // Todos los hooks deben declararse antes de cualquier return condicional
  const scrollViewRef = useRef(null);
  
  // Extraer rating para useMemo
  const rating = provider?.rating || 0;
  
  // Renderizar estrellas de calificación usando useMemo
  const ratingStars = useMemo(() => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, i) => (
      <Ionicons
        key={i + 1}
        name={(i + 1) <= rating ? "star" : "star-outline"}
        size={16}
        color={(i + 1) <= rating ? colors.warning : colors.border.medium}
      />
    ));
  }, [rating]);
  
  // Handlers usando operador de coalescencia nula
  // Deben definirse antes del return condicional
  const handleResenas = () => onResenas?.(provider);
  const handleConectar = () => onConectar?.(provider);
  
  // Verificamos si hay provider después de declarar todos los hooks y funciones
  if (!provider) return null;

  const {
    nombre,
    ubicacion,
    precio,
    horario,
    disponibilidad,
    descripcion,
    email,
    telefono
  } = provider;

  // Props del modal extraídas para mejor legibilidad
  const modalProps = {
    isVisible: visible,
    onBackdropPress: onClose,
    onBackButtonPress: onClose,
    onSwipeComplete: onClose,
    swipeDirection: ['down'],
    style: styles.modalContainer,
    propagateSwipe: true,
    scrollTo: (reactNode) => scrollViewRef.current?.scrollTo(reactNode),
    backdropTransitionOutTiming: 0,
    useNativeDriverForBackdrop: true,
    avoidKeyboard: true
  };

  // Texto que cambia según el tipo de proveedor
  const providerTypeText = providerType === 'cuidador' ? 'cuidador' : providerType === 'paseador' ? 'paseador' : 'veterinario';

  return (
    <Modal {...modalProps}>
      <View style={styles.contentContainer}>
        {/* Handle para arrastrar componente */}
        <View style={styles.handle} />
        
        {/* Header con info básica */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <Text style={styles.nombre}>{nombre}</Text>
            <View style={styles.ratingContainer}>
              {ratingStars}
            </View>
            <Text style={styles.ubicacion}>{ubicacion}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color={colors.text.secondary} />
          </TouchableOpacity>
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
          {/* Información de contacto */}
          <SectionContainer title="Información de contacto">
            <ContactItem 
              iconName="call-outline" 
              text={telefono || 'No disponible'} 
            />
            <ContactItem 
              iconName="mail-outline" 
              text={email || 'No disponible'} 
            />
          </SectionContainer>

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

          {/* Pasos a seguir */}
          <SectionContainer title="Pasos a seguir:">
            <StepItem 
              number="1" 
              text="Enviá tu solicitud de conexión al prestador." 
            />
            <StepItem 
              number="2" 
              text="Coordiná el horario y los detalles del servicio a través del chat." 
            />
            <StepItem 
              number="3" 
              text="Realizá el pago de manera segura desde la app." 
            />
            <StepItem 
              number="4" 
              text="¡Listo! El servicio se realizará según lo acordado." 
            />
          </SectionContainer>
        </ScrollView>

        {/* Botones de acción fijos */}
        <View style={styles.actionsContainer}>
          <GuardarCancelarBtn
            label="Conectar"
            onPress={handleConectar}
            variant="primary"
            showCancel={true}
            cancelLabel="Reseñas"
            onCancel={handleResenas}
          />
        </View>
      </View>
    </Modal>
  );
};

// Componentes auxiliares
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
