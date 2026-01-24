const transporter = require('../config/mailer');

// Enviar email de contacto
async function sendContactEmail({ nombre, email, mensaje }) {
  // Validar campos requeridos
  if (!nombre || !email || !mensaje) {
    throw new Error('Todos los campos son requeridos');
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('El email no es válido');
  }

  // Verificar que las credenciales SMTP estén configuradas
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('SMTP no configurado: faltan SMTP_USER o SMTP_PASS');
    throw new Error('Error de configuración del servidor');
  }

  // Configurar el email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACTO_EMAIL || process.env.SMTP_USER,
    replyTo: email,
    subject: `Contacto desde Pawtitas - ${nombre}`,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, '<br>')}</p>
    `,
    text: `
      Nuevo mensaje de contacto
      
      Nombre: ${nombre}
      Email: ${email}
      Mensaje: ${mensaje}
    `,
  };

  // Enviar email
  const info = await transporter.sendMail(mailOptions);
  console.log('Email enviado:', info.messageId);

  return info;
}

module.exports = {
  sendContactEmail,
};
