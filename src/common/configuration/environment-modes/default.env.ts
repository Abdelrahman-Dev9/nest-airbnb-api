import { EnvironmentInterface } from '../configuration.interface';

export const defaultEnv = (): EnvironmentInterface => ({
  port: Number(process.env.port),
});
