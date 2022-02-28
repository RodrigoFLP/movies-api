const express = require('express');
const MoviesService = require('../services/movies');
const joi = require('@hapi/joi');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
  const router = express.Router();
  const moviesService = new MoviesService();

  app.use('/api/movies', router);
  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: 'movies',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const movie = await moviesService.getMovie({ movieId });
        res.status(200).json({
          data: movie,
          message: 'movie retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const createdMovieId = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: createdMovieId,
          message: 'movie created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.put(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      const { movieId } = req.params;
      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie modified',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.patch(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const patchedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: patchedMovieId,
          message: 'movie patched',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}
module.exports = moviesApi;
