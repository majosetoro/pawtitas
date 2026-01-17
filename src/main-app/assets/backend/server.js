// server.js
require('dotenv').config();              // ← lee backend/.env

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

app.use(cors());                         // permitir peticiones desde la app
app.use(express.json());                 // parsear JSON

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

// Login (admin + usuario)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Faltan email y/o password' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (admin && admin.password === password) {
      return res.json({ success: true, admin: true, user: false });
    }

    const user = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { usuario: email }],
      },
    });

    if (!user || user.clave !== password) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }

    const safeUser = {
      id: user.id?.toString?.(),
      usuario: user.usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      rol: user.rol,
      domicilioId: user.domicilioId?.toString?.(),
      generoId: user.generoId?.toString?.(),
    };

    return res.json({ success: true, admin: false, user: true, userData: safeUser });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
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
