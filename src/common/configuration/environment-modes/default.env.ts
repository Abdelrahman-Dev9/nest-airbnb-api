import { EnvironmentInterface } from '../configuration.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.port),
  fullbackLanguage: process.env.FULLBACK_LANGUAGE as string,
});
