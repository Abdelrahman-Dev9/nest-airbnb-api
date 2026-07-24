import { EnvironmentInterface } from '../configuration.interface';
import { defaultEnv } from './default.env';

export const productionEnv = (): EnvironmentInterface => ({
  ...defaultEnv(),
  port: 6000,
});
