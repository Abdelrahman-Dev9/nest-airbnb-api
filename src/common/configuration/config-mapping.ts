import { EnvironmentInterface } from './configuration.interface';
import { developmentEnv } from './environment-modes/development.env';
import { productionEnv } from './environment-modes/production.env';
import { statgingEnv } from './environment-modes/statging.env';

const environtments: Record<string, () => EnvironmentInterface> = {
  development: developmentEnv,
  statging: statgingEnv,
  production: productionEnv,
};

export default (): EnvironmentInterface => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const getEnvToLoad = environtments[nodeEnv] || developmentEnv;

  return getEnvToLoad();
};
