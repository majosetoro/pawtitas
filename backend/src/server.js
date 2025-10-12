import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("🐾 Backend de Pawtitas funcionando");
});

// Ejemplo: GET usuarios
app.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
});

app.listen(PORT, () => console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`));
