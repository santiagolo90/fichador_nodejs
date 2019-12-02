/*
5-(2 pts.) ​ egreso ​ (PUT): Se guardaran los datos de egreso del usuario. 
Si no estaba ingresado informar la situación.
*/

var express = require('express');
var router = express.Router();

// var bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');

let mongoose = require('./../dbHelper/dbHelper');
let Ingreso = require('./../model/ingresoDto');
let Usuario = require('./../model/userDto');

const config = require('../configs/config');
const jwt = require('jsonwebtoken');


router.put('/', async (req,res,next) => {

    var currentUser;

    await Ingreso.findOne({"legajo":  req.token.usuario.legajo , "estado": "ingreso"}, null, {sort: { fechaIngreso : 'desc' }}, function(err, docs) { 
      if (docs == null) {
        let rta = {
         "code": -1,
         "data": "Primero debe ingresar al sistema"
       }
       res.json(rta); 
      }
      currentUser = docs;
     });
    
    await Ingreso.updateOne({"legajo":  currentUser.legajo , "estado": "ingreso"}, { "estado": "egreso", fechaEgreso: Date.now()}, function(err, resp) {
        console.log(resp);
        let rta = {
          "code": -1,
          "data": "Se registro el egreso",
          "resp": resp
        }
        res.json(rta);  
    })
});
module.exports = router;