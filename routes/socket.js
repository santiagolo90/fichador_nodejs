const { Server } = require('socket.io');

var msj = [];
module.exports = function(server){
  const io = new Server(server);
    

    io.on('connection', Socket =>{
        console.log("cliente conectado");
        Socket.on("error", (e)=>{
            console.log("error en : ",e);
        });
        Socket.on("SEND_MESSAGE", data =>{
            msj.push(data);
            Socket.emit("chat", msj);
            console.log("hola react :", data);
            if (data == "" ) {
                console.log("Debe completar los campos");
            }else{
                msj.push(data);
                Socket.emit("RECEIVE_MESSAGE", data);
                Socket.broadcast.emit("RECEIVE_MESSAGE", data);
            }
        })
        setInterval(() => Socket.emit('chat', msj), 1000);
        
    });
}

