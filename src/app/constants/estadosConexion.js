// Estados para conexiones entre usuarios y prestadores de servicios
export const ESTADOS_CONEXION = {
  PAGO_CONFIRMADO: 'confirmado',
  PENDIENTE_DE_PAGO: 'pendiente',
  SOLICITUD_RECHAZADA: 'rechazado',
  SERVICIO_FINALIZADO: 'finalizado'
};

export const ESTADOS_CONEXION_CONFIG = {
  [ESTADOS_CONEXION.PAGO_CONFIRMADO]: {
    label: 'Confirmado',
    icon: 'checkmark-circle',
    colorType: 'success'
  },
  [ESTADOS_CONEXION.PENDIENTE_DE_PAGO]: {
    label: 'Pendiente',
    icon: 'time',
    colorType: 'warning'
  },
  [ESTADOS_CONEXION.SOLICITUD_RECHAZADA]: {
    label: 'Rechazado',
    icon: 'close-circle',
    colorType: 'error'
  },
  [ESTADOS_CONEXION.SERVICIO_FINALIZADO]: {
    label: 'Finalizado',
    icon: 'checkmark-done-circle',
    colorType: 'success'
  }
};