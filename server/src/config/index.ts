import dev from './dev';
import prod from './prod';

const dict = {
  production: prod,
  development: dev,
};

const env = process.env.NODE_ENV;

export default (): Record<string, any> => dict[env];
