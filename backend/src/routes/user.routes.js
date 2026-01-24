const express = require('express');
const { 
  getPerfilController, 
  updatePerfilController 
} = require('../controllers/user.controller');

const router = express.Router();

router.get('/api/perfil/:id', getPerfilController);
router.put('/api/perfil/:id', updatePerfilController);

module.exports = router;
