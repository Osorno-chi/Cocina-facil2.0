const jwt = require("jsonwebtoken")
const config = require("../config/config")


function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: "1d"
        },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            });
    });
};

module.exports= createAccesToken;