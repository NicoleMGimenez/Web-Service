const pasajeCtrl = require('../controllers/pasaje.controller');
const express = require('express');
const router = express.Router();

router.get('/', pasajeCtrl.getPasajes );
router.get('/:id', pasajeCtrl.getPasaje)
router.post('/create', pasajeCtrl.createPasaje);
router.get('/filtro/:categoria', pasajeCtrl.filtrarPasajes);
router.put('/:id', pasajeCtrl.editPasaje);
router.delete('/:id', pasajeCtrl.deletePasaje);

module.exports = router;