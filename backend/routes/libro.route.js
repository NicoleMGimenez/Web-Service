const libroCtrl = require('./../controllers/libro.controller');

const express = require('express');
const router = express.Router();

router.get('/', libroCtrl.getLibros);
router.post('/', libroCtrl.createLibro);
router.delete('/:id', libroCtrl.deleteLibro);
router.put('/:id', libroCtrl.editLibro);
router.get('/destacado', libroCtrl.getLibrosDestacados);

module.exports = router;