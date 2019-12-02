var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

// var bcrypt = require('bcrypt');
var bcrypt = require('bcryptjs');
// const MongoClient = require('mongodb').MongoClient
// var ObjectId = require('mongodb').ObjectId;
// const url = "mongodb://localhost:27017"
// const dbName = 'sp'
// const client = new MongoClient(url, {useUnifiedTopology: true});


var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var ingresoRouter = require('./routes/ingreso');
var egresoRouter = require('./routes/egreso')
var socketRouter = require('./routes/socket')

//Middleware
var auditoriaMW = require('./routes/auditoria');
var corsMW = require('./middleware/corsMW');
var seguridadMW = require('./middleware/seguridad');


var app = express();
// const server = require('http').createServer(app);
// socketRouter(server);
// var io = require('socket.io').listen(server.listen(3002));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// app.use((req,res,next)=>{
//     client.connect(function(err){
//         const db = client.db(dbName);
//         req.db = db;
//         next();
//     })
// });

// app.get('/', function(req, res, next) {
// });

// Make io accessible to our router
// app.use(function(req,res,next){
//     req.io = io;
//     next();
// });

// io.sockets.on('connect', Socket =>{
//     var msj = [];
//     console.log("cliente conectado");
//     Socket.on("error", (e)=>{
//         console.log("error en : ",e);
//     });

//     Socket.on("chat", data =>{
//         msj.push(data);
//         Socket.emit("chat", msj);
//         console.log("hola react :", data);

//     })
//     setInterval(() => Socket.emit('chat', msj), 1000);
    
// });




app.use(corsMW);
app.use(auditoriaMW);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

//aca debo validar el token
app.use(seguridadMW);
app.use('/ingreso', ingresoRouter);
app.use('/egreso', egresoRouter);





module.exports = app;
