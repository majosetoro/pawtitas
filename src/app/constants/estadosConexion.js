// Estados para conexiones entre usuarios y prestadores de servicios
export const ESTADOS_CONEXION = {
  PAGO_CONFIRMADO: 'pagoConfirmado',
  PENDIENTE_DE_PAGO: 'pendienteDePago',
  SOLICITUD_RECHAZADA: 'solicitudRechazada'
};

export const ESTADOS_CONEXION_CONFIG = {
  [ESTADOS_CONEXION.PAGO_CONFIRMADO]: {
    label: 'Pago confirmado',
    icon: 'checkmark-circle',
    colorType: 'success'
  },
  [ESTADOS_CONEXION.PENDIENTE_DE_PAGO]: {
    label: 'Pendiente de pago',
    icon: 'time',
    colorType: 'warning'
  },
  [ESTADOS_CONEXION.SOLICITUD_RECHAZADA]: {
    label: 'Solicitud rechazada',
    icon: 'close-circle',
    colorType: 'error'
  }
};

