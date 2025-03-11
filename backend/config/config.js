require('dotenv').config();
const config = Object.freeze({
    DB_URL: process.env.DB_URL,
    port: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY
  });
  
  module.exports = config;