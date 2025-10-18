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
import { ESTADOS_CONEXION } from '../../constants/estadosConexion';
import GuardarCancelarBtn from '../buttons/GuardarCancelarBtn';
import EstadosChip from '../EstadosChip';
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
  const handleChat = () => onChat?.(provider);
  const handlePago = () => onPago?.(provider);
  const handleFinalizarServicio = () => onFinalizarServicio?.(provider);
  const handleAgregarResena = () => onAgregarResena?.(provider);
  
  // Verificamos si hay provider después de declarar todos los hooks y funciones
  if (!provider) return null;

  const {
    nombre,
    ubicacion,
    precio,
    horario,
    disponibilidad,
    descripcion,
    estado,
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
            <View style={styles.nameAndStatusRow}>
              <Text style={styles.nombre}>{nombre}</Text>
              {misConexiones && <EstadosChip estado={estado} showIcon={true} iconSize={14} />}
            </View>
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
          {!misConexiones && (
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
          )}

          {/* Advertencia de pago. Solo mostrar si es Mis Conexiones */}
          {misConexiones && (
            <View style={styles.warningContainer}>
              <View style={styles.warningHeader}>
                <Text style={styles.warningIcon}>💬</Text>
                <Text style={styles.warningTitle}>A tener en cuenta:</Text>
              </View>
              <View style={styles.warningContent}>
                <Text style={styles.warningText}>
                  • Tu pago será procesado con Mercado Pago de manera segura.
                </Text>
                <Text style={styles.warningText}>
                  • Al completar el pago, tu solicitud pasará a estado “Pago confirmado” y el servicio quedará validado.
                </Text>
                <Text style={styles.warningText}>
                  • Si tenés dudas o querés coordinar algo, podés comunicarte con el prestador a través del chat.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Botones de acción */}
        <View style={styles.actionsContainer}>
        {/* Estado confirmado */}
          {misConexiones && estado === ESTADOS_CONEXION.PAGO_CONFIRMADO ? (
            <GuardarCancelarBtn
              label="Finalizar servicio"
              onPress={handleFinalizarServicio}
              variant="primary"
              showCancel={true}
              cancelLabel="Chat"
              onCancel={handleChat}
            />
          // Estado rechazado o finalizado
          ) : misConexiones && (estado === ESTADOS_CONEXION.SOLICITUD_RECHAZADA || estado === ESTADOS_CONEXION.SERVICIO_FINALIZADO) ? (
            <GuardarCancelarBtn
              label="Agregar reseña"
              onPress={handleAgregarResena}
              variant="primary"
              showCancel={false}
            />
          ) : (
            // Estado pendiente
            <GuardarCancelarBtn
              label={misConexiones ? "Realizar Pago" : "Conectar"}
              onPress={misConexiones ? handlePago : handleConectar}
              variant="primary"
              showCancel={true}
              cancelLabel={misConexiones ? "Chat" : "Reseñas"}
              onCancel={misConexiones ? handleChat : handleResenas}
            />
          )}
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
