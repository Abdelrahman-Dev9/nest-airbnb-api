import { EnvironmentInterface } from '../configuration.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.port),
  fullbackLanguage: process.env.FULLBACK_LANGUAGE as string,
  mongodbUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRE_IN as string,
  refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRE_IN as string,
});
