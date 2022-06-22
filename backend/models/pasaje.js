const mongoose = require('mongoose');
const Persona = require('./persona');
const { Schema } = mongoose;
const PasajeSchema = new Schema({
    precioPasaje: { type: Number, required: true },
    categoriaPasajero: { type: String, required: true },
    fechaCompra: { type: String, required: true },
    pasajero: {type: Schema.Types.ObjectId, ref: Persona, required: true}
})
module.exports = mongoose.models.Pasaje || mongoose.model('Pasaje', PasajeSchema);