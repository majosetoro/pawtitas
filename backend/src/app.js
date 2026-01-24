const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const contactoRoutes = require('./routes/contacto.routes');
const overpassRoutes = require('./routes/overpass.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(contactoRoutes);
app.use(overpassRoutes);
app.use(healthRoutes);

module.exports = app;
