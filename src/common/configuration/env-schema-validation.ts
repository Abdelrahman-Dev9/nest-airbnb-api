import Joi, * as joi from 'joi';

export const envSchema = joi.object({
  PORT: Joi.number().integer().default(3000),
  NODE_ENV: Joi.string().required(),
});
