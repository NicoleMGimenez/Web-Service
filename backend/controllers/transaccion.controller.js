const Transaccion = require('../models/transaccion');
const transCtrl = {}

transCtrl.getTransacciones = async (req, res) => {
    var transacciones = await Transaccion.find();
    res.json(transacciones);
}

transCtrl.createTransaccion = async (req, res) => {
    var trans = new Transaccion(req.body);
    try {
        await trans.save();
        res.json({
            'status': '1',
            'msg': 'Transaccion guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

transCtrl.getTransaccionesCliente = async (req, res) => {
    const transC = await Transaccion.find({ emailCliente: { $regex: req.params.emailCliente } });
    res.json(transC);
}

transCtrl.getTransaccionesMonedas = async (req, res) => {
    try {
        const transC = await Transaccion.find({
            $and: [
                { monedaOrigen: { $regex: req.params.monedaOrigen } },
                { monedaDestino: { $regex: req.params.monedaDestino } }
            ]
        });
        res.json(transC);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            msg: "Error al obtener las transacciones"
        })
    }

}

// transCtrl.getTransaccionesMonedas = async (req, res) => {
//     try {
//         console.log(req);
//         var transacciones = await Transaccion.find({ monedaOrigen: req.params.monedaOrigen, monedaDestino: req.params.monedaDestino });
//         res.json(transacciones);
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             status: 0,
//             msg: "Error al obtener las transacciones"
//         })
//     }
// }

module.exports = transCtrl;