const Persona = require('../models/persona');
const personaCtrl = {}

personaCtrl.getPersonas = async (req, res) => {
    var personas = await Persona.find();
    res.json(personas);
}

personaCtrl.createPersona = async (req, res) => {
    var persona = new Persona(req.body);
    try {
        await persona.save();
        res.json({
            'status': '1',
            'msg': 'Persona guardada correctamente.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

personaCtrl.getPersona = async (req, res) => {
    const persona = await Persona.findById(req.params.id);
    res.json(persona);
}

module.exports = personaCtrl;