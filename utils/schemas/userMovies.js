const joi = require('@hapi/joi');

const { userIdSchema } = require('./user');
const { movieIdSchema } = require('./movies');

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMoviesSchema = joi.object({
  userId: userIdSchema.required(),
  movieId: movieIdSchema.required(),
});

module.exports = { userMovieIdSchema, createUserMoviesSchema };
