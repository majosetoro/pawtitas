const express = require('express');
const { contactoController } = require('../controllers/contacto.controller');

const router = express.Router();

router.post('/contacto', contactoController);

module.exports = router;
