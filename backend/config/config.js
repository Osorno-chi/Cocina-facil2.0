require('dotenv').config();

const config = Object.freeze({
    DB_URL: process.env.DB_URL,
    port: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL
});

module.exports = config;