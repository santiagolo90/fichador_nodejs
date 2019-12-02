
var mongoose = require('./../dbHelper/dbHelper');
var chatDto = require('./../model/chatDto');


module.exports.save = (mensaje) =>{
 
  const msj = new chatDto(mensaje);

  msj.save((err,result) => {
    if (err){
        console.log("error al guardar msj");
        return;
    }
    console.log("se guardo el msj");
  });
}


module.exports.findAll = () =>{
    return new Promise((resolve, reject) => {
      chatDto.find({},(err,data) =>{
        if (err) {
          console.log("error al traer mensajes: ",err);
          return reject(err);
        }
        return resolve(data);
      });
    }); 
    
}