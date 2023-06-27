import devConfig from './environment.dev';
import prodConfig from './environment.prod';

const isDev = process.env.NODE_ENV === 'development';

const environment = isDev ? devConfig : prodConfig;

export default environment;