// Configuración del formulario
export const FORM_CONFIG = {
  FLOATING_MESSAGE_DURATION: 4000,
  MAX_COMMENT_LENGTH: 255,
  TEXTAREA_LINES: 4,
  TEXTAREA_HEIGHT: 80
};

// Reglas de validación
export const VALIDATION_RULES = {
  rating: {
    required: true,
    message: 'La calificación es obligatoria',
    min: 1,
    minMessage: 'Debes seleccionar al menos 1 estrella'
  },
  comentario: {
    required: true,
    message: 'El comentario es obligatorio',
    maxLength: FORM_CONFIG.MAX_COMMENT_LENGTH,
    maxLengthMessage: `El comentario no puede exceder ${FORM_CONFIG.MAX_COMMENT_LENGTH} caracteres`
  }
};

export class ResenaController {
  static getTexts(tipoUsuario, usuario) {
    const nombre = usuario?.nombre || 'este usuario';
    
    if (tipoUsuario === 'cliente') {
      return {
        title: 'Calificar Cliente',
        subtitle: `¿Cómo fue tu experiencia con ${nombre}?`,
        placeholder: 'Comparte tu experiencia',
        saveButton: 'Enviar Reseña'
      };
    }
    
    return {
      title: 'Calificar Servicio',
      subtitle: `¿Cómo fue tu experiencia con ${nombre}?`,
      placeholder: 'Comparte tu experiencia',
      saveButton: 'Enviar Reseña'
    };
  }

  // Obtener formulario inicial vacío
  static getInitialFormData() {
    return {
      rating: 0,
      comentario: ''
    };
  }

  static validateField(field, value, rules) {
    // Validar campo requerido
    if (rules.required) {
      if (typeof value === 'string') {
        if (!value || value.trim().length === 0) {
          return rules.message;
        }
      } else if (typeof value === 'number') {
        if (!value || value < rules.min) {
          return rules.minMessage || rules.message;
        }
      }
    }
    
    // Validar longitud máxima
    if (rules.maxLength && value && value.length > rules.maxLength) {
      return rules.maxLengthMessage;
    }
    
    return null;
  }

  //Validar formulario
  static validateForm(formData) {
    const errors = {};
    
    // Validar rating
    const ratingError = this.validateField('rating', formData.rating, VALIDATION_RULES.rating);
    if (ratingError) {
      errors.rating = ratingError;
    }
    
    // Validar comentario
    const comentarioError = this.validateField('comentario', formData.comentario, VALIDATION_RULES.comentario);
    if (comentarioError) {
      errors.comentario = comentarioError;
    }
    
    return errors;
  }

  static isFormValid(formData, errors) {
    return formData.rating > 0 && 
           formData.comentario.trim().length > 0 && 
           Object.keys(errors).length === 0;
  }

  static prepareDataForSave(formData, tipoUsuario) {
    return {
      ...formData,
      tipoUsuario,
      fechaCreacion: new Date().toISOString()
    };
  }

  static async saveResena(formData, tipoUsuario) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Llamar a la API/backend para guardar la reseña
    const dataToSave = this.prepareDataForSave(formData, tipoUsuario);
    
    // Retornar éxito
    return {
      success: true,
      message: 'Reseña enviada correctamente',
      data: dataToSave
    };
  }

  // Limpiar campo de error cuando el usuario interactúa
  static clearFieldError(errors, field) {
    const { [field]: _, ...rest } = errors;
    return rest;
  }

  // Limpiar todos los errores
  static clearAllErrors() {
    return {};
  }
}