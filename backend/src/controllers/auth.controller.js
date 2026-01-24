const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const usuarioRepo = require('../repositories/usuario.repo');
const prestadorRepo = require('../repositories/prestador.repo');
const { registerUser } = require('../services/registro.service');

// Login
async function loginController(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Faltan email y/o password' });
    }

    // Verificar si es admin
    const admin = await prisma.admin.findUnique({ where: { email } });
    const isAdminPasswordValid = admin
      ? await bcrypt.compare(password, admin.password)
      : false;
    if (admin && isAdminPasswordValid) {
      return res.json({
        success: true,
        admin: true,
        user: false,
        userData: {
          id: admin.id?.toString?.() || admin.id,
          nombre: 'Administrador',
          apellido: '',
          email: admin.email,
          rol: 'ADMIN',
        },
      });
    }

    // Verificar si es usuario
    const usuario = await usuarioRepo.findByEmail(email);

    const isValidPassword = usuario
      ? await bcrypt.compare(password, usuario.clave)
      : false;

    if (!usuario || !isValidPassword) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const userData = {
      id: usuario.id?.toString?.() || usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      celular: usuario.celular,
      rol: usuario.rol,
      domicilio: usuario.domicilio
        ? {
            calle: usuario.domicilio.calle,
            numero: usuario.domicilio.numero,
            ciudad: usuario.domicilio.ciudad,
          }
        : null,
      creadoEn: usuario.creadoEn,
    };

    // Agregar datos del servicio si es prestador
    if (usuario.rol === 'PRESTADOR') {
      const prestador = await prestadorRepo.findByUsuarioId(usuario.id);
      const servicio = prestador?.prestadorservicio?.[0]?.servicio || null;
      
      if (servicio?.descripcion) userData.descripcion = servicio.descripcion;
      if (prestador?.perfil) userData.perfil = prestador.perfil;
      if (servicio?.tipoMascota) userData.tipoMascota = servicio.tipoMascota;
      if (servicio?.horarios) userData.horarios = servicio.horarios;
      if (servicio?.precio != null) userData.precio = servicio.precio;
      if (servicio?.disponible != null) userData.serviceActive = Boolean(servicio.disponible);
    }

    return res.json({ success: true, admin: false, user: true, userData });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
}

// Registro
async function registroController(req, res) {
  try {
    const result = await registerUser(req.body);
    return res.status(201).json({ success: true, user: result });
  } catch (err) {
    if (err.code === 'P2002') {
      return res
        .status(409)
        .json({ success: false, message: 'Email o documento ya registrado' });
    }
    console.error('registro error', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Error al registrar',
      detail: err?.message || String(err),
      code: err?.code,
    });
  }
}

module.exports = {
  loginController,
  registroController,
};
