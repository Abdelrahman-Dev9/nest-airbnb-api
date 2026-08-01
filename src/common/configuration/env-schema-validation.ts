import Joi, * as joi from 'joi';

export const envSchema = joi.object({
  PORT: Joi.number().integer().default(3000),
  NODE_ENV: Joi.string().required(),
  FULLBACK_LANGUAGE: Joi.string().required().default('ar'),
  MONGODB_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRE_IN: Joi.string().required().default(7),
  REFRESH_TOKEN_EXPIRE_IN: Joi.string().required().default(15),
  SYSTEM_ADMIN_NAME: Joi.string().required(),
  SYSTEM_ADMIN_EMAIL: Joi.string().email().required(),
  SYSTEM_ADMIN_PASSWORD: Joi.string().required(),
});
