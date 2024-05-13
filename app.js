var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const swaggerUi = require("swagger-ui-express");


//Rutas
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var ingresoRouter = require('./routes/ingreso');
var egresoRouter = require('./routes/egreso')
var indexRouter = require('./routes/index')
//var socketRouter = require('./routes/socket')
//Middleware
var auditoriaMW = require('./routes/auditoria');
var corsMW = require('./middleware/corsMW');
var seguridadMW = require('./middleware/seguridad');
const swaggerOptions = require('./configs/swagger');
//Init express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions, {
    explorer: true
  })
);

app.use(indexRouter);
app.use(corsMW);
app.use(auditoriaMW);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

//aca debo validar el token
app.use(seguridadMW);
app.use('/ingreso', ingresoRouter);
app.use('/egreso', egresoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
