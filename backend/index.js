//referenciamos librerias externas
const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database');
var app = express();

//middlewares

//Extendemos el limite para poder subir imagenes
app.use(express.json({limit: '25mb'}));
//app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
//Cargamos el modulo de direccionamiento de rutas
app.use('/api/libro', require('./routes/libro.route'));
app.use('/api/transaccion', require('./routes/transaccion.route'));
app.use('/api/persona', require('./routes/persona.route'))
app.use('/api/pasaje', require('./routes/pasaje.route'))

//setting
app.set('port', process.env.PORT || 3000);
//starting the server
app.listen(app.get('port'), () => {
console.log(`Server started on port`, app.get('port'));
});