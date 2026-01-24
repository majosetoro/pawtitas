const { sendContactEmail } = require('../services/email.service');

// Enviar email de contacto (Landing Page)
async function contactoController(req, res) {
  try {
    const { nombre, email, mensaje } = req.body;
    
    await sendContactEmail({ nombre, email, mensaje });
    
    res.json({ 
      success: true, 
      message: 'Mensaje enviado correctamente. Te responderemos a la brevedad.' 
    });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(error.message.includes('configuración') ? 500 : 400).json({ 
      success: false, 
      message: error.message || 'Error al enviar el mensaje. Por favor, intenta nuevamente más tarde.' 
    });
  }
}

module.exports = {
  contactoController,
};
