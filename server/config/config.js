require('dotenv').config();
const isSQLite = process.env.DB_DIALECT === 'sqlite';

module.exports = {
  development: {
    username: isSQLite ? null : process.env.DB_USER,
    password: isSQLite ? null : process.env.DB_PASSWORD,
    database: isSQLite ? process.env.DB_NAME : process.env.DB_NAME,
    host: isSQLite ? null : process.env.DB_HOST,
    port: isSQLite ? null : process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    storage: isSQLite ? process.env.DB_NAME : undefined,
    logging: true,
  },
  test: {
    username: isSQLite ? null : process.env.DB_USER,
    password: isSQLite ? null : process.env.DB_PASSWORD,
    database: isSQLite ? process.env.DB_NAME : process.env.DB_NAME,
    host: isSQLite ? null : process.env.DB_HOST,
    port: isSQLite ? null : process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    storage: isSQLite ? process.env.DB_NAME : undefined,
    logging: true,
  },
  production: {
    username: isSQLite ? null : process.env.DB_USER,
    password: isSQLite ? null : process.env.DB_PASSWORD,
    database: isSQLite ? process.env.DB_NAME : process.env.DB_NAME,
    host: isSQLite ? null : process.env.DB_HOST,
    port: isSQLite ? null : process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    storage: isSQLite ? process.env.DB_NAME : undefined,
  },
};
