let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var ingresoSchema = new Schema({
    legajo: String,
    tipo: String,
    estado: { type: String, enum: ['ingreso', 'egreso'] },
    fechaIngreso: Date,
    fechaEgreso: Date
},{ versionKey: false });




let Ingreso = mongoose.model('ingresos', ingresoSchema);

module.exports = Ingreso;