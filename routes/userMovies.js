const express = require('express');
const joi = require('@hapi/joi');

const validationHandler = require('../utils/middleware/validationHandler');
const { UserMoviesService } = require('../services/userMovies');

const {
  userMovieIdSchema,
  createUserMoviesSchema,
} = require('../utils/schemas/userMovies');
const { userIdSchema } = require('../utils/schemas/user');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    validationHandler(joi.object({ userId: userIdSchema }), 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        res.status(200).json({
          data: userMovies,
          message: 'user movies retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUserMoviesSchema),
    async (req, res, next) => {
      const { body: userMovie } = req;
      try {
        const createdUserMovieId = await userMoviesService.createUserMovie({
          userMovie,
        });
        res.status(201).json({
          data: createdUserMovieId,
          message: 'user movie created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    validationHandler(joi.object({ userMovieId: userMovieIdSchema }), 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;
      try {
        const deletedUserMovieId = userMoviesService.deleteUserMovie({
          userMovieId,
        });

        res.status(200).json({
          data: deletedUserMovieId,
          message: 'user movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userMoviesApi;
