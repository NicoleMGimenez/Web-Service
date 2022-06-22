const Libro = require('../models/libro');
const libroCtrl = {}

libroCtrl.getLibros = async (req, res) => {
    var libros = await Libro.find();
    res.json(libros);
}

libroCtrl.createLibro = async (req, res) => {
    var libro = new Libro(req.body);
    try {
        await libro.save();
        res.json({
            'status': '1',
            'msg': 'Libro creado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}

libroCtrl.deleteLibro = async (req, res) => {
    try {
        await Libro.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Libro eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

libroCtrl.editLibro = async (req, res) => {
    const libroEditado = new Libro(req.body);
    try {
        await Libro.updateOne({ _id: req.body._id }, libroEditado);
        res.status(200).json({
            'status': '1',
            'msg': 'Libro actualizado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

libroCtrl.getLibrosDestacados = async (req, res) => {
    var criteria = {'destacado':true};
    var libros = await Libro.find(criteria);
    res.json(libros);
}

module.exports = libroCtrl;