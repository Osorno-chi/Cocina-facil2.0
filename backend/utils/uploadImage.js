const path = require('path');
require('dotenv').config();

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        const ext = path.extname(image.name);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;

        let fullPath, rute;
        
        if(process.env.ENVIROMENT === "dev") {
            fullPath = path.join(__dirname, "..", "uploads", fileName);
            rute = `/uploads/${fileName}`;
        } else {
            fullPath = path.join("uploads", fileName);
            rute = path.join("uploads", fileName);
        }

        image.mv(fullPath, error => {
            if(error) {
                console.log(error);
                return reject({ 
                    status: 500, 
                    error: "There was an internal server error." 
                });
            }
            resolve(rute);
        });
    });
};

module.exports = uploadImage;