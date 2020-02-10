var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Requerido para el login y las sesiones
var mongoose = require('mongoose');
var monk = require('monk');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

const { idcadmin } = require('./config/database');
const { idckeys } = require('./config/database');
//DB Login
mongoose.connect(idcadmin,{
	useNewUrlParser: true
});
//DB Keys - con monk
var dbk = monk(idckeys);

require('./config/passport')(passport); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//LOGIN
app.use(session({
	secret: 'dogs',
  resave: false,
	saveUninitialized: false
}));
//DB Keys
app.use(function(req,res,next){
  req.db = dbk;
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

/*Iniciar proyecto desde la ruta del proyecto con el comando:
  npm start
*/

/*La base de datos en el servidor 172.18.227.82:3000 No está identificada donde se guarda..
*/
