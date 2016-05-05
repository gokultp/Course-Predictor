'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create router and set routes
var router = _express2.default.Router();
router.get('/', function (req, res, next) {
  res.render('extras', {
    message: 'welcome to extras!',
    base: true
  });
});
router.get('/:message', function (req, res, next) {
  if (req.params.hasOwnProperty('message')) {
    res.render('extras', {
      message: 'welcome to extras!\n        you currently are at ' + _path2.default.join('extras', req.params.message),
      base: false
    });
  } else {
    res.status(404);
  }
});

// export router
module.exports = router;