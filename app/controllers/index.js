'use strict';
// this controller is meant to set up routes from all other controllers
// it also sets up basic express routes

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// load models
var Movie = _mongoose2.default.model('Movie');

// create router
var router = _express2.default.Router();
// load other controllers
router.use('/extras', require('./extras'));

// set basic routes
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'courese-predictor'
  });
});
router.get('/movies', function (req, res, next) {
  Movie.find(function (err, movies) {
    if (err) return next(err);
    res.render('movies', {
      title: 'Movies!',
      movies: movies
    });
  });
});

// export router
module.exports = router;