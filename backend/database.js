//variable para que utilice las librerias de moongoose
const mongoose = require('mongoose');
const URI = 'mongodb://localhost/dbtp5';
//conectando con la bdd
mongoose.connect(URI)
.then(db=>console.log('DB is connected'))
.catch(err=>console.error(err))
//exportamos para que podamos utilizarlos en otro lado
module.exports = mongoose;