var express = require('express');
var router = express.Router();
const config = require('../configs/config');
const jwt = require('jsonwebtoken');

let  loginModule = require('../module/loginModule').moduleLogin;

// var bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');

router.post('/', (req, res) => {

  let legajo = req.body.legajo;
  let clave = req.body.clave;
  
  if (clave && legajo) {
    let login = loginModule(legajo,clave);
    login.then( rta => {
      res.json(rta);
    })
    .catch( error => {
      res.json(error);
    });  
  }else{
    let rta = {
      "code": -1,
      "data": "Usuario o contraseña incorrectos"
    }
    res.json(400,rta);
  }
})

module.exports = router;
