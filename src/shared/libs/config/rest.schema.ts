import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  HOST: string,
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  STATIC_ROOT: string;
  JWT_SECRET: string;
};

export const configRestSchema = convict<RestSchema>({
  HOST: {
    doc: 'Host for incoming connections',
    format: 'url',
    env: 'HOST',
    default: 'http://localhost:4000'
  },
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'buy-and-sell',
  },
  STATIC_ROOT: {
    doc: 'Root path for static files',
    format: String,
    env: 'STATIC_ROOT',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for sign jwt',
    format: String,
    env: 'JWT_SECRET',
    default: null
  }
});
