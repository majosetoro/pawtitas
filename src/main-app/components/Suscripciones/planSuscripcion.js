import { colors } from "../../../shared/styles";

// Planes de suscripción
export const planDuenos = {
  color: colors.brand.highlight,
  planes: [
    {
      titulo: "Plan Básico",
      precio: null,
      esGratis: true,
      esPremium: false,
      caracteristicas: [
        "Publicidad",
        "Ver perfiles completos",
        "Reseñas y calificaciones",
        "Chat con prestadores",
        "Mapa de ubicaciones",
        "Notificaciones en tiempo real",
        "Soporte 24/7"
      ],
    },
    {
      titulo: "Plan Premium",
      precio: 8000,
      esGratis: false,
      esPremium: true,
      caracteristicas: [
        "Publicidad",
        "Todo lo del Plan Básico",
      ],
    },
  ],
};

export const planPrestadores = {
  color: colors.brand.lightBlue,
  planes: [
    {
      titulo: "Plan Básico",
      precio: 8000,
      esGratis: false,
      esPremium: false,
      caracteristicas: [
        "Hasta 5 servicios por mes",
        "Reseñas y calificaciones",
        "Notificaciones en tiempo real",
        "Soporte 24/7"
      ],
    },
    {
      titulo: "Plan Premium",
      precio: 10000,
      esGratis: false,
      esPremium: true,
      caracteristicas: [
        "Servicios ilimitados",
        "Todo lo del Plan Básico",
      ],
    },
  ],
};

export const getPlansByProfileType = (tipoPerfil) => {
  if (tipoPerfil === "dueno") {
    return planDuenos;
  }
  if (tipoPerfil === "prestador") {
    return planPrestadores;
  }
  return null;
};

