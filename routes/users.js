var express = require('express');
var router = express.Router();


var bcrypt = require('bcrypt');
//var bcrypt = require('bcryptjs');


let mongoose = require('./../dbHelper/dbHelper');
let Usuario = require('./../model/userDto');


router.post('/', (req,res) => {

  let legajo = req.body.legajo;
  let clave = req.body.clave;
  let tipo = req.body.tipo;

  let hash = bcrypt.hashSync(clave, 10);


  let user = new Usuario({
    "legajo": legajo,
    "clave": hash,
    "tipo":tipo
  });

  user.save(function(err) {
    if (err){
      let rta = {
        "code": -1,
        "data": "error al guardar usuario",
        "error": err
      }
      res.json(rta);
    } else{
      let rta = {
        "code": 1,
        "data": "se guardo el usuario"
      }
      res.json(rta);
    }
  });
});

module.exports = router;
