const mongoose = require("mongoose");
const config =  require("./config");

const connection = async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log('successful connection')
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;