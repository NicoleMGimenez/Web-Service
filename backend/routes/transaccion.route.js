const transCtrl = require('./../controllers/transaccion.controller');

const express = require('express');
const router = express.Router();

router.get('/', transCtrl.getTransacciones);
router.post('/', transCtrl.createTransaccion);
router.get('/:emailCliente', transCtrl.getTransaccionesCliente);
//router.get('/monedas', transCtrl.getTransaccionesMonedas);
router.get('/:monedaOrigen/:monedaDestino', transCtrl.getTransaccionesMonedas);

module.exports = router;