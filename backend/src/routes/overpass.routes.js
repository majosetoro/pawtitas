const express = require('express');
const { overpassController } = require('../controllers/overpass.controller');

const router = express.Router();

router.get('/api/overpass', overpassController);

module.exports = router;
