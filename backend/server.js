// server.js
require('dotenv').config();              // ← lee backend/.env

const express = require('express');
const cors = require('cors');
const { PrismaClient, Prisma } = require('@prisma/client');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');




const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

app.use(cors());                         // permitir peticiones desde la app
app.use(express.json());                 // parsear JSON

// Helper para descomponer "Calle 123, Ciudad" o "Calle 123 Ciudad"
function descomponerUbicacion(ubicacionRaw) {
  if (!ubicacionRaw) {
    return { calle: 'Pendiente', numero: 'S/N', ciudad: 'Pendiente' };
  }
  const txt = String(ubicacionRaw).trim();

  const [calleNumeroParte, ciudadParte] = txt
    .split(',')
    .map((s) => s?.trim())
    .filter(Boolean);

  let calle = 'Pendiente';
  let numero = 'S/N';
  let ciudad = ciudadParte || 'Pendiente';

  if (calleNumeroParte) {
    const match = calleNumeroParte.match(/^(.+?)\s+(\d+[A-Za-z0-9\-]*)$/);
    if (match) {
      calle = match[1].trim();
      numero = match[2].trim();
    } else {
      calle = calleNumeroParte;
    }
  }

  // Heurística sin coma: "Calle Nombre 123 Ciudad"
  if (!ciudadParte) {
    const tokens = txt.split(/\s+/);
    if (tokens.length >= 3) {
      const posibleNumero = tokens[tokens.length - 2];
      if (/^\d/.test(posibleNumero)) {
        numero = posibleNumero;
        ciudad = tokens[tokens.length - 1] || ciudad;
        calle = tokens.slice(0, tokens.length - 2).join(' ') || calle;
      }
    }
  }

  return { calle, numero, ciudad };
}

function splitNombreApellido(nombreApellido) {
  const txt = String(nombreApellido || '').trim();
  if (!txt) return { nombre: '', apellido: '' };
  const [nombre, ...resto] = txt.split(/\s+/);
  return { nombre, apellido: resto.join(' ') };
}

function buildHorariosFromAvailability(availability = {}) {
  const days = Object.entries(availability)
    .filter(([, value]) => value === true)
    .map(([key]) => key);
  return days.join(',');
}

function buildPerfilFromServices(services = {}) {
  const labels = {
    cuidador: 'Cuidador',
    paseador: 'Paseador',
    veterinarioDomicilio: 'Veterinario a domicilio',
    clinicaVeterinaria: 'Clínica Veterinaria',
  };

  const selected = Object.entries(services)
    .filter(([, value]) => value === true)
    .map(([key]) => labels[key])
    .filter(Boolean);

  return selected.join(',');
}

function buildTipoMascotaFromPetTypes(petTypes = {}, petTypesCustom = '') {
  const labels = {
    perro: 'Perro',
    gato: 'Gato',
    conejo: 'Conejo',
    ave: 'Ave',
    roedor: 'Roedor',
    otro: petTypesCustom ? petTypesCustom.trim() : 'Otro',
  };

  const selected = Object.entries(petTypes)
    .filter(([, value]) => value === true)
    .map(([key]) => labels[key])
    .filter(Boolean);

  return selected.length ? selected.join(',') : 'General';
}

// Configuración Overpass para proxy
const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
];
const OVERPASS_TIMEOUT_MS = 25000; // 25s
const OVERPASS_MAX_RETRIES = 3;

// Proxy Overpass para evitar timeouts en clientes móviles
app.get('/api/overpass', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'missing query' });
  }

  const encodedQuery = encodeURIComponent(query);

  for (let attempt = 0; attempt < OVERPASS_MAX_RETRIES; attempt++) {
    const server = OVERPASS_SERVERS[attempt % OVERPASS_SERVERS.length];
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OVERPASS_TIMEOUT_MS);

    try {
      const url = `${server}?data=${encodedQuery}`;
      const response = await fetch(url, { method: 'GET', signal: controller.signal });
      clearTimeout(timer);

      if (!response.ok) {
        // Pasar a siguiente servidor o reintento
        continue;
      }

      const data = await response.json();
      return res.json(data);
    } catch (error) {
      clearTimeout(timer);
      // Si es el último intento, devolver error
      if (attempt === OVERPASS_MAX_RETRIES - 1) {
        return res.status(504).json({ error: 'timeout', detail: error.message });
      }
      // Si no, seguir con el siguiente servidor
    }
  }

  return res.status(504).json({ error: 'timeout' });
});

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Healthcheck: comprueba conexión a MySQL
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true });
  } catch (e) {
    console.error('Health error:', e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// Login admin o usuario (sin hash, solo dev)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Faltan email y/o password' });
    }

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

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        domicilio: true,
      },
    });

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

    if (usuario.rol === 'PRESTADOR') {
      const prestador = await prisma.prestador.findUnique({
        where: { usuarioId: usuario.id },
        include: {
          prestadorservicio: {
            take: 1,
            orderBy: { id: 'desc' },
            include: { servicio: true },
          },
        },
      });
      const servicio = prestador?.prestadorservicio?.[0]?.servicio || null;
      if (servicio?.descripcion) {
        userData.descripcion = servicio.descripcion;
      }
      if (prestador?.perfil) {
        userData.perfil = prestador.perfil;
      }
      if (servicio?.tipoMascota) {
        userData.tipoMascota = servicio.tipoMascota;
      }
      if (servicio?.horarios) {
        userData.horarios = servicio.horarios;
      }
      if (servicio?.precio != null) {
        userData.precio = servicio.precio;
      }
      if (servicio?.disponible != null) {
        userData.serviceActive = Boolean(servicio.disponible);
      }
    }

    return res.json({ success: true, admin: false, user: true, userData });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Obtener perfil (dueño/prestador/admin)
app.get('/api/perfil/:id', async (req, res) => {
  try {
    const { id } = req.params || {};
    const roleParam = String(req.query?.role || '').toLowerCase();

    if (!id) {
      return res.status(400).json({ success: false, message: 'Falta id de usuario' });
    }

    let userId;
    try {
      userId = BigInt(id);
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Id inválido' });
    }

    if (roleParam === 'admin') {
      const admin = await prisma.admin.findUnique({ where: { id: userId } });
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin no encontrado' });
      }
      return res.json({
        success: true,
        userData: {
          id: admin.id?.toString?.() || admin.id,
          nombre: 'Administrador',
          apellido: '',
          email: admin.email,
          rol: 'ADMIN',
        },
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { domicilio: true, duenio: true },
    });

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
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

    if (usuario.rol === 'DUENIO' && usuario.duenio?.comentarios) {
      userData.descripcion = usuario.duenio.comentarios;
    }

    if (usuario.rol === 'PRESTADOR') {
      const prestador = await prisma.prestador.findUnique({
        where: { usuarioId: usuario.id },
        include: {
          prestadorservicio: {
            take: 1,
            orderBy: { id: 'desc' },
            include: { servicio: true },
          },
        },
      });
      const servicio = prestador?.prestadorservicio?.[0]?.servicio || null;
      if (servicio?.descripcion) {
        userData.descripcion = servicio.descripcion;
      }
      if (prestador?.perfil) {
        userData.perfil = prestador.perfil;
      }
      if (servicio?.tipoMascota) {
        userData.tipoMascota = servicio.tipoMascota;
      }
      if (servicio?.horarios) {
        userData.horarios = servicio.horarios;
      }
      if (servicio?.precio != null) {
        userData.precio = servicio.precio;
      }
      if (servicio?.disponible != null) {
        userData.serviceActive = Boolean(servicio.disponible);
      }
    }

    return res.json({ success: true, userData });
  } catch (err) {
    console.error('perfil get error', err);
    return res.status(500).json({ success: false, message: 'Error al obtener perfil' });
  }
});

// Actualizar perfil (dueño/prestador/admin)
app.put('/api/perfil/:id', async (req, res) => {
  try {
    const { id } = req.params || {};
    if (!id) {
      return res.status(400).json({ success: false, message: 'Falta id de usuario' });
    }

    let userId;
    try {
      userId = BigInt(id);
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Id inválido' });
    }

    const {
      role,
      nombreApellido,
      descripcion,
      email,
      telefono,
      ubicacion,
      services,
      precio,
      availability,
      petTypes,
      petTypesCustom,
      serviceActive,
    } = req.body || {};

    const normalizedRole = String(role || '').toLowerCase();
    if (!normalizedRole) {
      return res.status(400).json({ success: false, message: 'Falta role' });
    }

    if (normalizedRole === 'admin') {
      const admin = await prisma.admin.findUnique({ where: { id: userId } });
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin no encontrado' });
      }

      const adminData = {};
      if (email) adminData.email = email;

      const updatedAdmin = Object.keys(adminData).length
        ? await prisma.admin.update({ where: { id: userId }, data: adminData })
        : admin;

      return res.json({
        success: true,
        userData: {
          id: updatedAdmin.id?.toString?.() || updatedAdmin.id,
          nombre: 'Administrador',
          apellido: '',
          email: updatedAdmin.email,
          rol: 'ADMIN',
        },
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { domicilio: true },
    });

    if (!usuario) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const { nombre, apellido } = splitNombreApellido(nombreApellido);
    const { calle, numero, ciudad } = descomponerUbicacion(ubicacion);
    const priceNumber = Number(precio);
    const hasPrice = Number.isFinite(priceNumber);

    await prisma.$transaction(async (tx) => {
      const dataUsuario = {};
      if (nombre) dataUsuario.nombre = nombre;
      if (apellido) dataUsuario.apellido = apellido;
      if (email) dataUsuario.email = email;
      if (telefono) dataUsuario.celular = telefono;

      if (Object.keys(dataUsuario).length) {
        await tx.usuario.update({ where: { id: userId }, data: dataUsuario });
      }

      if (ubicacion) {
        if (usuario.domicilioId) {
          await tx.domicilio.update({
            where: { id: usuario.domicilioId },
            data: { calle, numero, ciudad },
          });
        } else {
          const nuevoDom = await tx.domicilio.create({
            data: { calle, numero, ciudad },
          });
          await tx.usuario.update({
            where: { id: userId },
            data: { domicilioId: nuevoDom.id },
          });
        }
      }

      if (normalizedRole === 'duenio' && descripcion) {
        await tx.duenio.upsert({
          where: { usuarioId: userId },
          update: { comentarios: descripcion },
          create: { usuarioId: userId, comentarios: descripcion },
        });
      }

      if (normalizedRole === 'prestador') {
        const perfilValue = buildPerfilFromServices(services);
        const horariosValue = buildHorariosFromAvailability(availability);
        const tipoMascotaValue = buildTipoMascotaFromPetTypes(petTypes, petTypesCustom);

        const prestador = await tx.prestador.upsert({
          where: { usuarioId: userId },
          update: {},
          create: { usuarioId: userId, perfil: perfilValue || 'Pendiente' },
        });

        await tx.prestador.update({
          where: { id: prestador.id },
          data: {
            perfil: perfilValue || null,
          },
        });

        const existingLink = await tx.prestadorservicio.findFirst({
          where: { prestadorId: prestador.id },
          orderBy: { id: 'desc' },
          select: { servicioId: true },
        });

        const servicioData = {
          descripcion: descripcion || 'Sin descripción',
          tipoMascota: tipoMascotaValue,
          precio: new Prisma.Decimal(hasPrice ? priceNumber : 0),
          horarios: horariosValue || null,
          disponible: serviceActive === true,
        };

        if (existingLink?.servicioId) {
          await tx.servicio.update({
            where: { id: existingLink.servicioId },
            data: servicioData,
          });
        } else {
          const servicio = await tx.servicio.create({ data: servicioData });
          await tx.prestadorservicio.create({
            data: { prestadorId: prestador.id, servicioId: servicio.id },
          });
        }
      }
    });

    const updatedUser = await prisma.usuario.findUnique({
      where: { id: userId },
      include: { domicilio: true },
    });

    let descripcionServicio = null;
    let perfilServicio = null;
    let horariosServicio = null;
    let tipoMascotaServicio = null;
    let precioServicio = null;
    let estadoServicio = null;
    if (updatedUser?.rol === 'PRESTADOR') {
      const prestador = await prisma.prestador.findUnique({
        where: { usuarioId: userId },
        include: {
          prestadorservicio: {
            take: 1,
            orderBy: { id: 'desc' },
            include: { servicio: true },
          },
        },
      });
      const servicio = prestador?.prestadorservicio?.[0]?.servicio || null;
      descripcionServicio = servicio?.descripcion || null;
      perfilServicio = prestador?.perfil || null;
      horariosServicio = servicio?.horarios || null;
      tipoMascotaServicio = servicio?.tipoMascota || null;
      precioServicio = servicio?.precio ?? null;
      estadoServicio = servicio?.disponible ?? null;
    }

    return res.json({
      success: true,
      userData: {
        id: updatedUser.id?.toString?.() || updatedUser.id,
        nombre: updatedUser.nombre,
        apellido: updatedUser.apellido,
        email: updatedUser.email,
        celular: updatedUser.celular,
        rol: updatedUser.rol,
        descripcion: descripcionServicio || (normalizedRole === 'duenio' ? descripcion : undefined),
        perfil: perfilServicio || undefined,
        horarios: horariosServicio || undefined,
        tipoMascota: tipoMascotaServicio || undefined,
        precio: precioServicio ?? undefined,
        serviceActive: estadoServicio ?? undefined,
        domicilio: updatedUser.domicilio
          ? {
              calle: updatedUser.domicilio.calle,
              numero: updatedUser.domicilio.numero,
              ciudad: updatedUser.domicilio.ciudad,
            }
          : null,
        creadoEn: updatedUser.creadoEn,
      },
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ success: false, message: 'Email ya registrado' });
    }
    console.error('perfil update error', err);
    return res.status(500).json({ success: false, message: 'Error al actualizar perfil' });
  }
});

// Registro de usuario (Dueño o Prestador)
app.post('/api/registro', async (req, res) => {
  const {
    nombre,
    apellido,
    fechaNacimiento,
    correo,
    password,
    telefono,
    ubicacion,
    documento,
    genero,
    perfil,
    especialidad,
    documentosFile,
    certificadosFile,
  } = req.body || {};

  const required = [
    'nombre',
    'apellido',
    'fechaNacimiento',
    'correo',
    'password',
    'telefono',
    'ubicacion',
    'documento',
    'genero',
    'perfil',
  ];
  const missing = required.filter((k) => !req.body?.[k]);
  if (missing.length) {
    return res.status(400).json({ success: false, message: `Faltan: ${missing.join(', ')}` });
  }

  const fecha = new Date(fechaNacimiento);
  if (Number.isNaN(fecha.getTime())) {
    return res.status(400).json({ success: false, message: 'fechaNacimiento inválida' });
  }

  const { calle, numero, ciudad } = descomponerUbicacion(ubicacion);

  try {
    // Verificar duplicados antes de crear
    const existingUser = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email: correo },
          { dni: documento },
          { usuario: correo },
        ],
      },
      select: { email: true, dni: true, usuario: true },
    });

    if (existingUser) {
      const conflicts = [];
      if (existingUser.email === correo) conflicts.push('email');
      if (existingUser.dni === documento) conflicts.push('documento');
      if (existingUser.usuario === correo) conflicts.push('usuario');

      return res.status(409).json({
        success: false,
        message: `Ya existe un usuario registrado con este ${conflicts.join(' y ')}`,
      });
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const generoRow = await tx.genero.upsert({
        where: { nombre: genero },
        update: {},
        create: { nombre: genero },
      });

      const domicilioRow = await tx.domicilio.create({
        data: { calle, numero, ciudad },
      });

      const usuarioRow = await tx.usuario.create({
        data: {
          usuario: correo,
          clave: hashedPassword,
          nombre,
          apellido,
          dni: documento,
          fechaNacimiento: fecha,
          celular: telefono,
          email: correo,
          rol: perfil === 'prestador' ? 'PRESTADOR' : 'DUENIO',
          domicilioId: domicilioRow.id,
          generoId: generoRow.id,
        },
      });

      if (perfil === 'prestador') {
        const prestador = await tx.prestador.create({
          data: {
            usuarioId: usuarioRow.id,
            certificaciones: certificadosFile?.name || null,
            documentos: documentosFile?.name || null,
            perfil: especialidad || null,
          },
        });

        if (especialidad) {
          const servicio = await tx.servicio.upsert({
            where: { descripcion: especialidad },
            update: {},
            create: {
              descripcion: especialidad,
              tipoMascota: 'General',
              precio: new Prisma.Decimal(0),
            },
          });
          await tx.prestadorservicio.upsert({
            where: {
              prestadorId_servicioId: { prestadorId: prestador.id, servicioId: servicio.id },
            },
            update: {},
            create: { prestadorId: prestador.id, servicioId: servicio.id },
          });
        }
      } else {
        await tx.duenio.create({ data: { usuarioId: usuarioRow.id } });
      }

      return usuarioRow;
    });

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
      message: 'Error al registrar',
      detail: err?.message || String(err),
      code: err?.code,
    });
  }
});

// Endpoint de contacto
app.post('/contacto', async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Validar campos requeridos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'El email no es válido' 
      });
    }

    // Verificar que las credenciales SMTP estén configuradas
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP no configurado: faltan SMTP_USER o SMTP_PASS');
      return res.status(500).json({ 
        success: false, 
        message: 'Error de configuración del servidor' 
      });
    }

    // Configurar el email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACTO_EMAIL || process.env.SMTP_USER, // Email donde recibirás los mensajes
      replyTo: email, // Para que puedas responder directamente al usuario
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

    res.json({ 
      success: true, 
      message: 'Mensaje enviado correctamente. Te responderemos a la brevedad.' 
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error al enviar el mensaje. Por favor, intenta nuevamente más tarde.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

// Cierre prolijo
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
