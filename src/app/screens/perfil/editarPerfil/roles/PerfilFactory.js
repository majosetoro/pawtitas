import React from 'react';
import ROLES from './types';
import PetOwnerProfileForm from './PetOwnerProfileForm';
import PrestadorServicioPerfilForm from './PrestadorServicioPerfilForm';
import AdminPerfilForm from './AdminPerfilForm';

// Factory Pattern. Componente de formulario según el rol del usuario autenticado
export default class PerfilFactory {
  static createProfileForm(role, props) {
    switch(role) {
      case ROLES.PET_OWNER:
        return <PetOwnerProfileForm {...props} />;
      case ROLES.SERVICE_PROVIDER:
        return <PrestadorServicioPerfilForm {...props} />;
      case ROLES.ADMIN:
        return <AdminPerfilForm {...props} />;
      default:
        console.warn(`Rol desconocido: ${role}, usando formulario de dueño por defecto`);
        return <PetOwnerProfileForm {...props} />;
    }
  }

  // Obtener la configuración inicial del formulario según el rol
  static getInitialFormState(role) {
    const baseFormState = {
      avatarUri: null,
      nombreApellido: "",
      descripcion: "",
      email: "",
    };

    switch(role) {
      case ROLES.PET_OWNER:
        return {
          ...baseFormState,
          telefono: "",
          ubicacion: "",
        };
      case ROLES.SERVICE_PROVIDER:
        return {
          ...baseFormState,
          telefono: "",
          ubicacion: "",
          precio: "",
          duracion: "",
          services: {
            cuidador: false,
            paseador: false,
            veterinarioDomicilio: false,
            clinicaVeterinaria: false,
          },
          petTypes: {
            perro: false,
            gato: false,
            conejo: false,
            ave: false,
            roedor: false,
            otro: false,
          },
          petTypesCustom: "",
          availability: {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false,
          },
          serviceActive: false,
        };
      case ROLES.ADMIN:
        return baseFormState;
      default:
        return baseFormState;
    }
  }

  // Validar el formulario según el rol del usuario
  static validateForm(formData, role) {
    const errors = {};

    // Validaciones para todos los roles
    if (!formData.nombreApellido?.trim()) {
      errors.nombreApellido = "El nombre y apellido son requeridos";
    }

    if (!formData.descripcion?.trim()) {
      errors.descripcion = "La descripción es requerida";
    } else if (formData.descripcion.length > 255) {
      errors.descripcion = "La descripción no puede exceder 255 caracteres";
    }

    if (!formData.email?.trim()) {
      errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El email no es válido";
    }

    // Validaciones específicas por rol
    switch(role) {
      case ROLES.PET_OWNER:
      case ROLES.SERVICE_PROVIDER:
        if (!formData.telefono?.trim()) {
          errors.telefono = "El número de teléfono es requerido";
        }

        if (!formData.ubicacion?.trim()) {
          errors.ubicacion = "La ubicación es requerida";
        }
        
        // Validaciones específicas para prestador de servicios
        if (role === ROLES.SERVICE_PROVIDER) {
          if (!formData.precio?.trim()) {
            errors.precio = "El precio es requerido";
          }
          
          if (!formData.duracion?.trim()) {
            errors.duracion = "La duración es requerida";
          }
          
          // Validar al menos un servicio seleccionado
          const hasService = Object.values(formData.services || {}).some(value => value === true);
          if (!hasService) {
            errors.services = "Debes seleccionar al menos un tipo de servicio";
          }
          
          // Validar al menos un día de disponibilidad seleccionado solo si el servicio está activo
          if (formData.serviceActive === true) {
            const hasAvailability = Object.values(formData.availability || {}).some(value => value === true);
            if (!hasAvailability) {
              errors.availability = "Debes seleccionar al menos un día de disponibilidad";
            }
          }
        }
        break;
      case ROLES.ADMIN:
        // Validaciones para administrador, agregar en caso de ser necesario
        break;
      default:
        break;
    }

    return errors;
  }
}
