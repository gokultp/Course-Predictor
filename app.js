'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// BASIC CONFIG
var config = {
  // address of mongodb
  db: process.env.MONGOURI || 'mongodb://course_admin:Course123@ds013172.mlab.com:13172/course_predictor',
  // environment
  env: process.env.NODE_ENV || 'development',
  // port on which to listen
  port: 5000,
  // path to root directory of this app
  root: _path2.default.normalize(__dirname)
};

// EXPRESS SET-UP
// create app
var app = (0, _express2.default)();
// use jade and set views and client directories
app.set('view engine', 'jade');
app.set('views', _path2.default.join(config.root, 'app/views'));
app.use(_express2.default.static(_path2.default.join(config.root, 'client')));
//add middlewares
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use((0, _compression2.default)());
app.use((0, _cookieParser2.default)());
app.use((0, _serveFavicon2.default)(_path2.default.join(config.root, 'client/img/favicon.png')));
app.use((0, _helmet2.default)());
// load all models
require(_path2.default.join(config.root, 'app/models'));
// load all controllers
app.use('/', require(_path2.default.join(config.root, 'app/controllers')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// general errors
app.use(function (err, req, res, next) {
  var sc = err.status || 500;
  res.status(sc);
  res.render('error', {
    status: sc,
    message: err.message,
    stack: config.env === 'development' ? err.stack : ''
  });
});

// MONGOOSE SET-UP
_mongoose2.default.connect(config.db);
var db = _mongoose2.default.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

// START AND STOP
var server = app.listen(config.port, function () {
  console.log('listening on port ' + config.port);
});
process.on('SIGINT', function () {
  console.log('\nshutting down!');
  db.close();
  server.close();
  process.exit();
});