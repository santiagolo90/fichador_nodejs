const config = require('../configs/config');
const jwt = require('jsonwebtoken');
let Usuario = require('./../model/userDto');

var bcrypt = require('bcryptjs');
module.exports.moduleLogin = function(legajo,clave){
    
    let rta = {};
    return new Promise((resolve, reject) => {
        Usuario.findOne({ "legajo": legajo}, function (err, user) {
            if (err){
                rta = {
                    "code": -1,
                    "data": "Complete los campos del login",
                    "err":err
                  }
                 return reject(rta);
            }
            if (bcrypt.compareSync(clave, user.clave)) {
                const payload = {
                  usuario: {
                    "_id": user._id,
                    "legajo": user.legajo,
                    "tipo": user.tipo
                  }
                };
                const token = jwt.sign(payload, config.clave, {
                  expiresIn: 60 * 60
                });
                rta = {
                  "code": 1,
                  "data": "Autenticación correcta",
                  "token": token
                }
                return resolve(rta);
              }else{
                rta = {
                  "code": -1,
                  "data": "Usuario o contraseña incorrectos"
                }
                return reject(rta);
              }

        });
    }); 
}
