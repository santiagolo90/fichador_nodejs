var express = require('express');
var router = express.Router();

// var bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');

let mongoose = require('./../dbHelper/dbHelper');
let Ingreso = require('./../model/ingresoDto');
let Usuario = require('./../model/userDto');

const config = require('../configs/config');
const jwt = require('jsonwebtoken');

var currentUser;



router.put('/', async (req,res,next) => {
/*
4- (2 pt.) ​ ingreso ​ (PUT): Se debera fichar el ingreso del usuario guardando la hora y el usuario. 
Si el usuario ya había ingresado con anterioridad informar la situación.
*/

    var currentUser;
    // await Ingreso.find({ "legajo":  req.token.usuario.legajo}, function (err, user) {
    //   currentUser = user;
    // });

    await Ingreso.findOne({"legajo":  req.token.usuario.legajo}, null, {sort: { fechaIngreso : 'desc' }}, function(err, docs) { 
      currentUser = docs;
     });
    
     console.log(currentUser); 
     if ( currentUser == null || currentUser.estado == "egreso") {
      let ingreso = new Ingreso({
        "legajo": req.token.usuario.legajo,
        "tipo":  req.token.usuario.tipo,
        "estado":"ingreso",
        "fechaIngreso": Date.now()
      });

      ingreso.save(function(err) {
        if (err){
          let rta = {
            "code": -1,
            "data": "error al guardar ingreso",
            "error": err
          }
          res.json(rta);
        } else{
          let rta = {
            "code": 1,
            "data": "se guardo el ingreso"
          }
          res.json(rta);
        }
      });
    }else{
         let rta = {
           "code": -1,
           "data": "el usuario ya ingreso al sistema",
           "user": currentUser
         }
         res.json(rta);  
    }
});

router.get('/', async (req,res) => {
/*
    6- (2 pts.) ​ ingreso ​ (GET). Se devolverán todos los ingresos del usuario actual.
    7- (2 pts.) ​ ingreso ​ (GET). Solo admin. devolver el último ingreso de cada usuario.
*/

  if (req.token.usuario.tipo == "user") {
    await Ingreso.find({ "legajo":  req.token.usuario.legajo},null,{sort: { fechaIngreso : 'desc' }}, function (err, user) {
      if (err) {
        let rta = {
          "code": -1,
          "data": "Error al traer los ingresos",
          "user": err
        }
        res.json(rta);  
      }else{
        let rta = {
          "code": 1,
          "data": user,
        }
        res.json(rta); 
      } 
    });
    
  }
  else{
    Ingreso.aggregate([
      {
          $group: {
              _id: {
                    legajo:"$legajo",
                  },
                "fechaIngreso": { "$max": "$fechaIngreso" },

          }
      },{
        $sort: {
          "fechaIngreso": -1
        }
    }
  ], function (err, result) {
      if (err) {
          next(err);
      } else {
          res.json(result);
      }
  });
  }
});
module.exports = router;