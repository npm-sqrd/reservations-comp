require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
    },
    searchPath: ['public'],
    migrations: {
      directory: './server/db/migrations/',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DB_NAME,
    },
    searchPath: ['public'],
    migrations: {
      directory: './server/db/migrations/',
    },
  },
};
