const pasaje = require('../models/pasaje');
const Pasaje = require('../models/pasaje');
const Persona = require('../models/persona');

const pasajeCtrl = {}

pasajeCtrl.getPasajes = async (req, res) => {
    var pasajes = await Pasaje.find().populate("pasajero");
    res.json(pasajes);
}

pasajeCtrl.getPasaje = async (req, res) => {
    const pasaje = await Pasaje.findById(req.params.id).populate("pasajero");
    res.json(pasaje);
}

// pasajeCtrl.getPasaje = async (req, res) => {
//     try {
//         const pasaje = await Pasaje.findById(req.params.id).populate("pasajero")
//         res.status(200).json(pasaje)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             status: 0,
//             msg: "Error al obtener el pasaje"
//         })
//     }
// }

pasajeCtrl.createPasaje = async (req, res) => {
    var pasaje = new Pasaje(req.body);
    try {

        if (req.body.categoriaPasajero != "m" && req.body.categoriaPasajero != "a"
            && req.body.categoriaPasajero != "j")
            throw new Error()

        const persona = await Persona.findOne({ _id: pasaje.pasajero })

        if (persona == null) throw new Error()

        await pasaje.save();
        res.json({
            'status': '1',
            'msg': 'Pasaje guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

pasajeCtrl.filtrarPasajes = async (req, res) => {
    try {
        const categoria = req.params.categoria;
        if (categoria != 'm' && categoria != 'a' && categoria != 'j')
            throw new Error('Categoria de Pasajero invalida')

        const pasajes = await Pasaje.find({ categoriaPasajero: categoria }).populate("pasajero");
        res.status(200).json(pasajes);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: '0',
            msg: 'Error al filtrar pasajes'
        })
    }
}


pasajeCtrl.editPasaje = async (req, res) => {
    const pasajeEd = new Pasaje(req.body);
    try {

        if (req.body.categoriaPasajero != "m" && req.body.categoriaPasajero != "a"
            && req.body.categoriaPasajero != "j")
            throw new Error()

        const persona = await Persona.findOne({ _id: pasajeEd.pasajero })

        if (persona == null) throw new Error()

        await Pasaje.updateOne({ _id: pasajeEd._id }, pasajeEd);
        res.status(200).json({
            'status': '1',
            'msg': 'Pasaje actualizado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

pasajeCtrl.deletePasaje = async (req, res) => {
    try {
        await Pasaje.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pasaje Eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = pasajeCtrl;