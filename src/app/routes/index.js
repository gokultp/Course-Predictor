'use strict';
// this controller is meant to set up routes from all other controllers
// it also sets up basic express routes

import express from 'express';
import mongoose from 'mongoose';
import movies from '../controllers/movies.server.controller';



// create router
const router = express.Router();
// load other controllers
router.use('/extras', require('./extras'));

// set basic routes
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'course-predictor'
  });
});
router.get('/movies', movies.getMovie);

// export router
module.exports = router;
