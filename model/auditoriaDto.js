let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var auditoriaSchema = new Schema({
    ip: String,
    ruta: String,
    metodo: String,
    fecha: { 
        type: Date,
        default: Date.now
    },
    usuario: String
},{ versionKey: false });




let Auditoria = mongoose.model('auditorias', auditoriaSchema);

module.exports = Auditoria;