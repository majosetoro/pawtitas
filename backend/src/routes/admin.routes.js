const express = require('express');
const { listPrestadores, updatePrestadorEstado } = require('../controllers/admin.controller');

const router = express.Router();

router.get('/api/admin/prestadores', listPrestadores);
router.patch('/api/admin/prestadores/:usuarioId', updatePrestadorEstado);

module.exports = router;
