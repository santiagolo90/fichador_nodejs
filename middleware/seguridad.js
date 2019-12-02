var express = require('express');
var router = express.Router();

let mongoose = require('../dbHelper/dbHelper');

const config = require('../configs/config');
const jwt = require('jsonwebtoken');

router.use((req,res,next)=>{
    const token = req.headers['token'];
    if (token) {
      jwt.verify(token, config.clave, (err, decoded) => {      
        if (!err) {
          const decodeToken = decoded;
          req.token = decodeToken;
          next();
        }else{
            let rta = {
                "code": -1,
                "data": "Acceso denegado, error en token"
              }
            res.json(rta);
        }
      });
    }else{
        let rta = {
            "code": -1,
            "data": "Acceso denegado, falta token"
          }
        res.json(rta);
    }
});

module.exports = router;
