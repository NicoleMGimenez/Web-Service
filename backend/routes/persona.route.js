const personaCtrl = require('./../controllers/persona.controller');

const express = require('express');
const router = express.Router();

router.get('/', personaCtrl.getPersonas);
router.post('/', personaCtrl.createPersona);
router.get('/:id', personaCtrl.getPersona);

module.exports = router;