const postgres = require('postgres');

// Database configuration
const dbConfig = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  port: process.env.RDS_PORT
};

const connection = postgres(dbConfig)

module.exports = connection