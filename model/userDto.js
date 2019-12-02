let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var usuarioSchema = new Schema({
    legajo: { type: Number, min: 1, max: 1000, unique: true,index: true },
    clave: String,
    tipo: { type: String, enum: ['admin', 'user'] }
},{ versionKey: false });




let Usuario = mongoose.model('users', usuarioSchema);

module.exports = Usuario;