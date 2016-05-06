'use strict';
import mongoose from 'mongoose';

// load models
const Movie = mongoose.model('Movie');

export function getMovie(req, res, next) {
  Movie.find((err, movies) => {
    if (err) return next(err);
    res.render('movies', {
      title: 'Movies!',
      movies
    });
  });
}
