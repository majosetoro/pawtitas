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

// Login admin simple (sin hash, solo dev)
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
    return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
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
