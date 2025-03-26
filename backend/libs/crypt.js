const crypt = require('crypto-js');
const config = require('../config/config');

const encryptData = (data)=>{
    return crypt.AES.encrypt(data, config.SECRET_KEY).toString();
}

const desencryptData = (data)=>{
    return crypt.AES.decrypt(data, config.SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

module.exports = {encryptData, desencryptData};