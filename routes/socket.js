var mongoose = require('./../dbHelper/dbHelper');
const mensajeSave = require('./../module/mensajesModule').save;
const mensajes = require('./../module/mensajesModule').findAll;


module.exports = function(server){
  var io = require("socket.io")(server);
    
    // io.use((Socket,next)=>{
    //     let token = Socket.handshake.query.token;
    //     Socket.token = token;
    //     console.log("token: ",token)
    //     next();
    // })

    io.on('connection', Socket =>{
        console.log("cliente conectado");
        Socket.on("error", (e)=>{
            console.log("error en : ",e);
            
        });

        mensajes().then(docs =>{
            var msj = [];
            msj.push(...docs);
            Socket.emit("INIT_MESSAGE", docs);
        }).catch(err =>{
            console.log(err);
        })

        Socket.on("SEND_MESSAGE", data =>{
            if (data.author == ""  || data.message == "") {
                console.log("Debe completar los campos");
            }else{
                mensajeSave(data);
                Socket.emit("RECEIVE_MESSAGE", data);
                Socket.broadcast.emit("RECEIVE_MESSAGE", data);
            }
        })
        
    });
}

