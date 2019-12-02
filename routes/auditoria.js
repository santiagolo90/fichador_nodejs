var express = require('express');
var router = express.Router();

let mongoose = require('../dbHelper/dbHelper');
let Auditoria = require('../model/auditoriaDto');

const config = require('../configs/config');
const jwt = require('jsonwebtoken');

router.use((req,res,next)=>{
  const token = req.headers['token'];
  let decodeToken;
  if (token) {
    jwt.verify(token, config.clave, (err, decoded) => {      
      if (!err) {
        decodeToken = decoded.usuario.tipo; 
      }
    });
  }

   let aud = new Auditoria({
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      ruta: req.originalUrl,
      metodo: req.method,
      usuario: decodeToken
  });
  
  aud.save(function(err) {
    if (err) throw err;
    console.log('se guardo la auditoria');
  });
    

  next();
});


module.exports = router;
