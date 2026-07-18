import { EnvironmentInterface } from '../configuration.interface';
import { defaultEnv } from './default.env';

export const statgingEnv = (): EnvironmentInterface => ({
  ...defaultEnv(),
  port: 5000,
});
