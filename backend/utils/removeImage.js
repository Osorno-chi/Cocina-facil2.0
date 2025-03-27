const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const removeImage = (rute) => {
    const pathImage = process.env.ENVIROMENT === "dev"
        ? path.join(__dirname, "..", "uploads", path.basename(rute))
        : rute;

    fs.unlink(pathImage)
        .then(() => {
            console.log("File removed.");
        })
        .catch(error => {
            console.error('Something wrong happened removing the file', error);
        });
};

module.exports = removeImage;