const express = require('express');
const { loginController, registroController } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', loginController);
router.post('/api/registro', registroController);

module.exports = router;
