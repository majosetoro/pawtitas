import React, { useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal'; // ✅ CORRECTO
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
  providerType = 'cuidador', // cuidador, paseador o veterinario
  misConexiones = false,
  onChat,
  onPago,
  onFinalizarServicio,
}) => {
  const scrollViewRef = useRef(null);
  const rating = provider?.rating || 0;

  // Estrellas de calificación
  const ratingStars = useMemo(() => {
    const maxStars = 5;
    return Array.from({ length: maxStars }, (_, i) => (
      <Ionicons
        key={i + 1}
        name={i + 1 <= rating ? 'star' : 'star-outline'}
        size={16}
        color={i + 1 <= rating ? colors.warning : colors.border.medium}
      />
    ));
  }, [rating]);

  // Handlers
  const handleResenas = () => onResenas?.(provider);
  const handleConectar = () => onConectar?.(provider);
  const handleChat = () => onChat?.(provider);
  const handlePago = () => onPago?.(provider);
  const handleFinalizarServicio = () => onFinalizarServicio?.(provider);

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

  const modalProps = {
    isVisible: visible,
    onBackdropPress: onClose,
    onBackButtonPress: onClose,
    onSwipeComplete: onClose,
    swipeDirection: ['down'],
    style: styles.modalContainer,
    propagateSwipe: true,
    useNativeDriverForBackdrop: true,
    avoidKeyboard: true,
  };

  const providerTypeText =
    providerType === 'cuidador'
      ? 'cuidador'
      : providerType === 'paseador'
      ? 'paseador'
      : 'veterinario';

  return (
    <Modal {...modalProps}>
      <View style={styles.contentContainer}>
        {/* Handle para arrastrar */}
        <View style={styles.handle} />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            <View style={styles.nameAndStatusRow}>
              <Text style={styles.nombre}>{nombre}</Text>
              {misConexiones && (
                <EstadosChip estado={estado} showIcon={true} iconSize={14} />
              )}
            </View>
            <View style={styles.ratingContainer}>{ratingStars}</View>
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

        {/* Contenido Scroll */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator
          bounces
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          persistentScrollbar
        >
          <SectionContainer title="Precio y horarios">
            <ContactItem iconName="cash-outline" text={precio} />
            <ContactItem iconName="time-outline" text={horario} />
            <ContactItem iconName="calendar-outline" text={disponibilidad} />
          </SectionContainer>

          <SectionContainer title={`Sobre el ${providerTypeText}`}>
            <Text style={styles.descripcion}>{descripcion}</Text>
          </SectionContainer>

          {!misConexiones && (
            <SectionContainer title="Pasos a seguir:">
              <StepItem number="1" text="Enviá tu solicitud de conexión al prestador." />
              <StepItem number="2" text="Coordiná horario y detalles por el chat." />
              <StepItem number="3" text="Realizá el pago de manera segura." />
              <StepItem number="4" text="¡Listo! Servicio confirmado." />
            </SectionContainer>
          )}

          {misConexiones && (
            <View style={styles.warningContainer}>
              <View style={styles.warningHeader}>
                <Text style={styles.warningIcon}>💬</Text>
                <Text style={styles.warningTitle}>A tener en cuenta:</Text>
              </View>
              <View style={styles.warningContent}>
                <Text style={styles.warningText}>
                  • Tu pago será procesado con Mercado Pago.
                </Text>
                <Text style={styles.warningText}>
                  • Al completar el pago, tu solicitud pasará a “Pago confirmado”.
                </Text>
                <Text style={styles.warningText}>
                  • Podés coordinar detalles a través del chat.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Botones de acción */}
        <View style={styles.actionsContainer}>
          {misConexiones && estado === ESTADOS_CONEXION.SERVICIO_FINALIZADO ? (
            <GuardarCancelarBtn
              label="Chat"
              onPress={handleChat}
              variant="primary"
              showCancel={false}
            />
          ) : misConexiones && estado === ESTADOS_CONEXION.PAGO_CONFIRMADO ? (
            <GuardarCancelarBtn
              label="Finalizar Servicio"
              onPress={handleFinalizarServicio}
              variant="primary"
              showCancel={true}
              cancelLabel="Chat"
              onCancel={handleChat}
            />
          ) : misConexiones && estado === ESTADOS_CONEXION.SOLICITUD_RECHAZADA ? (
            <GuardarCancelarBtn
              label="Chat"
              onPress={handleChat}
              variant="primary"
              showCancel={false}
            />
          ) : (
            <GuardarCancelarBtn
              label={misConexiones ? 'Realizar Pago' : 'Conectar'}
              onPress={misConexiones ? handlePago : handleConectar}
              variant="primary"
              showCancel={true}
              cancelLabel={misConexiones ? 'Chat' : 'Reseñas'}
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
