require('dotenv').config();
const path = require('path'); 

const config = Object.freeze({
    DB_URL: process.env.DB_URL,
    port: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    FRONTEND_URL: process.env.FRONTEND_URL,
    ENVIROMENT: process.env.ENVIROMENT,
    UPLOADS_DIR: path.join(__dirname, '../public/uploads'),
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY
});

module.exports = config;