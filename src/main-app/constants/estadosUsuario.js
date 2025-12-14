// Estados para prestadores de servicios en el panel de administrador
export const ESTADOS_USUARIO = {
  ACTIVADO: 'activado',
  PENDIENTE: 'pendiente',
  DESACTIVADO: 'desactivado'
};

export const ESTADOS_USUARIO_CONFIG = {
  [ESTADOS_USUARIO.ACTIVADO]: {
    label: 'Activado',
    colorType: 'success'
  },
  [ESTADOS_USUARIO.PENDIENTE]: {
    label: 'Pendiente',
    colorType: 'warning'
  },
  [ESTADOS_USUARIO.DESACTIVADO]: {
    label: 'Desactivado',
    colorType: 'error'
  }
};

