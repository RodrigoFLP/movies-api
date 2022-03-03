const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-z-A-Z]{24}$/);

const createUserSchema = joi.object({
  name: joi.string().max(100).required(),
  password: joi.string().required(),
  email: joi.string().email().required(),
  isAdmin: joi.boolean(),
});

module.exports = { userIdSchema, createUserSchema };
